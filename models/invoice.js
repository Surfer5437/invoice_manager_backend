"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { algorithm, key, iv } = require("../config");
const crypto = require('crypto');

/** Related functions for companies. */

class Invoice {
  /** Create an invoice (from data), update db, return new invoice data.
   *
   * data should be { date, amount, service_type, file_url, company_id, job_po_number }
   *
   * Returns { id, date, amount, service_type, file_url, company_id, job_po_number }
   **/

  static async create(data) {
    const result = await db.query(
          `INSERT INTO invoices (date,
                             amount,
                             service_type,
                             file_url,
                             company_id,
                             job_po_number)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING id, 
           date,
           amount,
           service_type,
           file_url,
           company_id,
           job_po_number`,
        [
          data.date,
          data.amount,
          data.service_type,
          data.file_url,
          data.company_id,
          data.job_po_number
        ]);
    let invoice = result.rows[0];
    return invoice
}

  /** Find all invoices ().
   *
   * Returns [{ id, date, amount, service_type, file_url, job_po_number, companyName }, ...]
   * */

  static async findAll() {
    let query = await db.query(
      `SELECT i.id,
      i.date,
      i.amount,
      i.service_type,
      i.file_url,
      i.job_po_number,
      c.name AS "companyName"
        FROM invoices i 
        LEFT JOIN companies AS c ON c.id = i.company_id`);
    let allInvoices = query.rows;
return allInvoices
  }

    /** Find all invoices per company (company_id).
   *
   * Returns [{ id, date, amount, service_type, file_url, job_po_number, companyName }, ...]
   * */

    static async findAllInvoicesPerCompany(company_id) {
      let query = await db.query(
        `SELECT i.id,
        i.date,
        i.amount,
        i.service_type,
        i.file_url,
        i.job_po_number,
        c.name AS "companyName"
          FROM invoices i 
          LEFT JOIN companies AS c ON c.id = i.company_id
          WHERE c.id = $1`,
          [company_id]);
      let allInvoices = query.rows;
      if (!allInvoices) return {"invoice":"No invoices yet"};
  return allInvoices;
    }

  /** Given a invoice id, return data about invoice.
   *
   * Returns { id, date, amount, service_type, file_url, company_id }
   *   where company is { id }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const invoiceRes = await db.query(
          `SELECT id as "invoiceNumber",
                  date,
                  amount,
                  service_type,
                  file_url,
                  company_id
           FROM invoices
           WHERE id = $1`, [id]);

    const invoice = invoiceRes.rows[0];

    if (!invoice) throw new NotFoundError(`No invoice: ${id}`);

    const companiesRes = await db.query(
          `SELECT id,
                  name,
                  address,
                  contact_name,
                  phone_number
           FROM companies
           WHERE id = $1`, [invoice.company_id]);

    delete invoice.company_id;
    invoice.company = companiesRes.rows[0];

return JSON.parse(invoice)

  }

  /** Update invoice data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: { title, salary, equity }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data);
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE invoices 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id as "invoiceNumber", 
                                date, 
                                amount, 
                                service_type,
                                file_url,
                                job_po_number`;
    const result = await db.query(querySql, [...values, id]);
    const invoice = result.rows[0];

    if (!invoice) throw new NotFoundError(`No invoice: ${id}`);

return JSON.parse(invoice)
  }

  /** Delete given invoice from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM invoices
           WHERE id = $1
           RETURNING id`, [id]);
    const invoice = result.rows[0];

    if (!invoice) throw new NotFoundError(`No invoice: ${id}`);
  }
}

module.exports = Invoice;
