--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: livin
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    contact_name text,
    phone_number character varying(10),
    tax_id character varying(9)
);


ALTER TABLE public.companies OWNER TO livin;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: livin
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO livin;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: livin
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: company_payments; Type: TABLE; Schema: public; Owner: livin
--

CREATE TABLE public.company_payments (
    company_id integer NOT NULL,
    payment_id integer NOT NULL
);


ALTER TABLE public.company_payments OWNER TO livin;

--
-- Name: invoices; Type: TABLE; Schema: public; Owner: livin
--

CREATE TABLE public.invoices (
    id integer NOT NULL,
    date date NOT NULL,
    amount double precision,
    service_type text NOT NULL,
    file_url text NOT NULL,
    company_id integer NOT NULL,
    job_po_number text NOT NULL
);


ALTER TABLE public.invoices OWNER TO livin;

--
-- Name: invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: livin
--

CREATE SEQUENCE public.invoices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invoices_id_seq OWNER TO livin;

--
-- Name: invoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: livin
--

ALTER SEQUENCE public.invoices_id_seq OWNED BY public.invoices.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: livin
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    date date NOT NULL,
    amount double precision,
    paid_with integer NOT NULL,
    invoice_number integer NOT NULL,
    company_id integer NOT NULL,
    transaction_id integer NOT NULL
);


ALTER TABLE public.payments OWNER TO livin;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: livin
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payments_id_seq OWNER TO livin;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: livin
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: livin
--

CREATE TABLE public.users (
    username character varying(25) NOT NULL,
    password text NOT NULL,
    company_id integer NOT NULL,
    email text NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_check CHECK ((POSITION(('@'::text) IN (email)) > 1))
);


ALTER TABLE public.users OWNER TO livin;

--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: livin
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: invoices id; Type: DEFAULT; Schema: public; Owner: livin
--

ALTER TABLE ONLY public.invoices ALTER COLUMN id SET DEFAULT nextval('public.invoices_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: livin
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: livin
--

COPY public.companies (id, name, address, contact_name, phone_number, tax_id) FROM stdin;
1	Central Florida Software	Winter Haven, FL	Brandon	8635217985	L38524684
2	Slickery Quick Fidgets	Spinner Haven, FL	Landon	8635217985	L3654184
\.


--
-- Data for Name: company_payments; Type: TABLE DATA; Schema: public; Owner: livin
--

COPY public.company_payments (company_id, payment_id) FROM stdin;
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: livin
--

COPY public.invoices (id, date, amount, service_type, file_url, company_id, job_po_number) FROM stdin;
1	2001-05-20	100000	build	05202001.pdf	1	L156879963
2	2001-05-20	100000	build	05202001.pdf	1	L156879963
3	2001-05-20	100000	build	05202001.pdf	1	L156879963
4	2001-06-07	100000	build	06072011.pdf	2	L156698963
5	2001-10-06	100000	build	10062020.pdf	2	L156698963
6	2001-10-06	100000	build	10062021.pdf	2	L156698964
7	2023-10-16	35264	Repair	C:\\fakepath\\20230821-statements-2936-.pdf	2	5416465468
8	2023-10-16	586468	Maintenance	C:\\fakepath\\Livingstone Full stack resume.pdf	2	654848
9	2023-10-17	48654	Repair	C:\\fakepath\\Livingstone Resume full-stack Software Engineer.pdf	1	684864
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: livin
--

COPY public.payments (id, date, amount, paid_with, invoice_number, company_id, transaction_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: livin
--

COPY public.users (username, password, company_id, email, is_admin) FROM stdin;
Admin	$2b$12$RzndhhtCmlAYMK9a9Us4ludgqp0Y44HW3oyyvKa4xnnGCI8A0//eG	1	soul_surf@gmail.com	t
nonAdmin	$2b$12$2c.VqWpMZnPIECrIM2x6YuaKEFd8EZvZWGVL9u55M.iz1xDCSameS	2	user_account@gmail.com	f
nonAdmin2	$2b$12$2die1d3eW5aNRpTD.h.oU.yWG3JkDWANKAHM03NRjXNdq17V.8TGu	3	user_account2@gmail.com	f
Admin2	$2b$12$Rj89ztXLW/AUoRXoFipIVO3lHAzWsiIARuTk0Srw1rauX.4y82Coy	2	user_account3@gmail.com	t
Surfer5437	$2b$12$Ao4D5ETVfz78bQT7xawq8usrFizI5oEOV/g8OiKM7WmujT9u/JVrO	4	exampleemail@host.com	f
Surfoiwjerf	$2b$12$0IiE3cBqFBUTZiw/Q8XLHuGkiwemOBThZbpmMDZZ13Q1oy2WqexOW	5	exampleemail@host.com	f
\.


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: livin
--

SELECT pg_catalog.setval('public.companies_id_seq', 2, true);


--
-- Name: invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: livin
--

SELECT pg_catalog.setval('public.invoices_id_seq', 9, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: livin
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: livin
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: livin
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: livin
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: livin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- PostgreSQL database dump complete
--

