CREATE TABLE users(
  username varchar(25) PRIMARY KEY,
  password TEXT NOT NULL,
  company_id integer NOT NULL,
  email text NOT NULL CHECK (position('@' IN email) > 1),
  is_admin boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE companies(
  id serial PRIMARY KEY,
  name text NOT NULL,
  address text NOT NULL,
  contact_name text,
  phone_number varchar(10),
  tax_id varchar(9)
);

CREATE TABLE payments(
  id serial PRIMARY KEY,
  date date NOT NULL,
  -- date is stored yyyy-mm-dd
  amount float,
  paid_with integer NOT NULL,
  invoice_number integer NOT NULL,
  company_id integer NOT NULL,
  transaction_id integer NOT NULL
);

CREATE TABLE invoices(
  id serial PRIMARY KEY,
  date date NOT NULL,
  -- date is stored yyyy-mm-dd
  amount float,
  service_type text NOT NULL,
  file_url text NOT NULL,
  company_id integer NOT NULL,
  job_po_number text NOT NULL
);

CREATE TABLE company_payments(
  company_id integer NOT NULL,
  payment_id integer NOT NULL
);

