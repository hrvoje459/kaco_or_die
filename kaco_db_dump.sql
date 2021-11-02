--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

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
-- Name: data_entry; Type: TABLE; Schema: public; Owner: kaco
--

CREATE TABLE public.data_entry (
    "timestamp" timestamp without time zone NOT NULL,
    plant_id integer NOT NULL,
    gen_volt1 numeric(10,2) NOT NULL,
    gen_volt2 numeric(10,2) NOT NULL,
    grid_volt1 numeric(10,2) NOT NULL,
    grid_volt2 numeric(10,2) NOT NULL,
    grid_volt3 numeric(10,2) NOT NULL,
    gen_cur1 numeric(10,2) NOT NULL,
    gen_cur2 numeric(10,2) NOT NULL,
    grid_cur1 numeric(10,2) NOT NULL,
    grid_cur2 numeric(10,2) NOT NULL,
    grid_cur3 numeric(10,2) NOT NULL,
    grid_pow numeric(10,2) NOT NULL,
    device_temp numeric(10,2) NOT NULL,
    device_status character varying(20) NOT NULL
);


ALTER TABLE public.data_entry OWNER TO kaco;

--
-- Name: location; Type: TABLE; Schema: public; Owner: kaco
--

CREATE TABLE public.location (
    location_id integer NOT NULL,
    country character varying(255) NOT NULL,
    district character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    post_number integer NOT NULL,
    address character varying(255) NOT NULL
);


ALTER TABLE public.location OWNER TO kaco;

--
-- Name: location_location_id_seq; Type: SEQUENCE; Schema: public; Owner: kaco
--

CREATE SEQUENCE public.location_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.location_location_id_seq OWNER TO kaco;

--
-- Name: location_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kaco
--

ALTER SEQUENCE public.location_location_id_seq OWNED BY public.location.location_id;


--
-- Name: owned_by; Type: TABLE; Schema: public; Owner: kaco
--

CREATE TABLE public.owned_by (
    plant_id integer NOT NULL,
    person_id integer NOT NULL
);


ALTER TABLE public.owned_by OWNER TO kaco;

--
-- Name: person; Type: TABLE; Schema: public; Owner: kaco
--

CREATE TABLE public.person (
    person_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL
);


ALTER TABLE public.person OWNER TO kaco;

--
-- Name: person_person_id_seq; Type: SEQUENCE; Schema: public; Owner: kaco
--

CREATE SEQUENCE public.person_person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_person_id_seq OWNER TO kaco;

--
-- Name: person_person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kaco
--

ALTER SEQUENCE public.person_person_id_seq OWNED BY public.person.person_id;


--
-- Name: power_plant; Type: TABLE; Schema: public; Owner: kaco
--

CREATE TABLE public.power_plant (
    plant_id integer NOT NULL,
    plant_name character varying(255) NOT NULL,
    plant_type character varying(40) NOT NULL,
    nominal_power numeric(10,2) NOT NULL,
    deployment_date timestamp without time zone NOT NULL,
    location_id integer NOT NULL
);


ALTER TABLE public.power_plant OWNER TO kaco;

--
-- Name: power_plant_plant_id_seq; Type: SEQUENCE; Schema: public; Owner: kaco
--

CREATE SEQUENCE public.power_plant_plant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.power_plant_plant_id_seq OWNER TO kaco;

--
-- Name: power_plant_plant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kaco
--

ALTER SEQUENCE public.power_plant_plant_id_seq OWNED BY public.power_plant.plant_id;


--
-- Name: location location_id; Type: DEFAULT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.location ALTER COLUMN location_id SET DEFAULT nextval('public.location_location_id_seq'::regclass);


--
-- Name: person person_id; Type: DEFAULT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.person ALTER COLUMN person_id SET DEFAULT nextval('public.person_person_id_seq'::regclass);


--
-- Name: power_plant plant_id; Type: DEFAULT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.power_plant ALTER COLUMN plant_id SET DEFAULT nextval('public.power_plant_plant_id_seq'::regclass);


--
-- Data for Name: data_entry; Type: TABLE DATA; Schema: public; Owner: kaco
--

COPY public.data_entry ("timestamp", plant_id, gen_volt1, gen_volt2, grid_volt1, grid_volt2, grid_volt3, gen_cur1, gen_cur2, grid_cur1, grid_cur2, grid_cur3, grid_pow, device_temp, device_status) FROM stdin;
2021-11-01 14:02:54	1	369.61	307.30	236.16	239.19	234.96	6.04	5.96	5.73	5.66	5.63	3971.92	43.25	4
2021-11-01 14:02:56	1	372.91	306.35	236.06	239.29	234.89	5.98	5.98	5.73	5.65	5.64	3970.40	43.25	4
2021-11-01 14:02:58	1	373.03	309.06	236.48	239.43	235.09	5.98	5.92	5.72	5.66	5.64	3968.87	43.24	4
2021-11-01 14:03:14	1	372.64	309.65	232.40	240.82	236.14	5.98	5.91	5.74	5.65	5.65	3964.29	43.26	4
2021-11-01 14:03:17	1	369.34	308.77	233.16	241.41	236.09	6.04	5.92	5.73	5.64	5.63	3964.29	43.25	4
2021-11-01 14:03:19	1	376.13	308.74	232.65	241.07	236.14	5.92	5.93	5.73	5.65	5.63	3964.29	43.28	4
2021-11-01 14:03:21	1	369.22	308.70	233.23	241.46	236.53	6.03	5.92	5.71	5.63	5.63	3964.29	43.27	4
2021-11-01 14:03:02	1	369.41	306.23	237.06	240.09	235.99	6.04	5.98	5.69	5.62	5.62	3970.40	43.22	4
2021-11-01 14:03:25	1	372.61	305.69	233.30	241.53	236.72	5.98	5.98	5.71	5.63	5.63	3964.29	43.25	4
2021-11-01 14:03:23	1	372.71	311.41	232.89	241.17	236.16	5.98	5.87	5.73	5.65	5.63	3964.29	43.25	4
2021-11-01 14:03:00	1	369.61	309.06	236.58	239.63	235.38	6.04	5.93	5.71	5.65	5.62	3968.87	43.27	4
2021-11-01 14:03:27	1	369.17	308.67	233.26	241.56	236.60	6.04	5.93	5.73	5.65	5.65	3967.35	43.28	4
2021-11-01 14:03:08	1	369.44	303.18	232.30	240.82	236.11	6.03	6.02	5.73	5.65	5.63	3962.77	43.26	4
2021-11-01 14:03:29	1	369.15	308.55	233.16	241.43	236.55	6.04	5.93	5.72	5.65	5.63	3967.35	43.26	4
2021-11-01 14:03:33	1	372.52	311.28	232.50	240.31	235.21	5.99	5.88	5.74	5.67	5.65	3967.35	43.25	4
2021-11-01 14:03:35	1	369.10	308.50	232.16	240.16	234.99	6.05	5.94	5.75	5.67	5.66	3967.35	43.25	4
2021-11-01 14:03:37	1	375.76	308.43	232.69	240.75	235.60	5.93	5.94	5.73	5.65	5.64	3965.82	43.25	4
2021-11-01 14:03:39	1	372.30	311.14	232.77	240.68	235.38	5.99	5.88	5.74	5.66	5.65	3967.35	43.34	4
2021-11-01 14:03:31	1	372.56	305.77	232.23	240.48	235.65	5.99	5.98	5.74	5.67	5.65	3965.82	43.25	4
2021-11-01 14:03:04	1	372.93	306.16	231.50	239.77	235.38	5.98	5.97	5.74	5.67	5.66	3965.82	43.29	4
2021-11-01 14:03:06	1	372.86	309.84	232.67	240.73	236.23	5.98	5.90	5.72	5.64	5.64	3962.77	43.28	4
2021-11-01 14:03:41	1	372.42	305.57	232.74	240.78	235.57	5.99	5.99	5.73	5.64	5.66	3967.35	43.26	4
2021-11-01 14:03:43	1	375.54	308.28	232.74	240.70	235.50	5.93	5.94	5.72	5.66	5.64	3967.35	43.25	4
2021-11-01 14:03:47	1	372.10	305.47	232.67	240.53	235.28	6.00	5.99	5.74	5.65	5.65	3965.82	43.25	4
2021-11-01 14:03:49	1	372.15	310.97	233.11	240.97	235.72	5.99	5.88	5.71	5.64	5.63	3965.82	43.25	4
2021-11-01 14:03:45	1	368.80	308.26	232.89	240.51	235.50	6.05	5.94	5.73	5.67	5.65	3967.35	43.25	4
2021-11-01 14:03:51	1	375.47	308.13	233.18	241.07	235.92	5.93	5.94	5.72	5.64	5.64	3965.82	43.27	4
2021-11-01 14:03:53	1	368.71	308.16	233.04	240.92	235.77	6.05	5.94	5.73	5.65	5.64	3964.29	43.25	4
2021-11-01 14:03:58	1	372.00	305.35	232.89	241.07	235.79	6.00	5.99	5.72	5.65	5.63	3967.35	43.25	4
2021-11-01 14:04:00	1	368.56	308.06	230.37	241.63	236.92	6.05	5.94	5.74	5.65	5.65	3967.35	43.25	4
2021-11-01 14:04:02	1	371.95	310.72	232.11	240.65	235.97	5.99	5.89	5.73	5.65	5.65	3967.35	43.27	4
2021-11-01 14:03:55	1	372.05	310.82	232.86	240.75	235.62	6.00	5.88	5.73	5.65	5.64	3964.29	43.28	4
2021-11-01 14:04:06	1	368.34	307.96	232.01	240.58	235.79	6.05	5.95	5.73	5.66	5.65	3967.35	43.31	4
2021-11-01 14:04:04	1	375.18	307.96	232.25	240.60	235.87	5.94	5.95	5.74	5.65	5.65	3967.35	43.28	4
2021-11-01 14:04:08	1	371.83	310.67	232.11	240.80	235.89	6.00	5.89	5.74	5.66	5.66	3968.87	43.23	4
2021-11-01 14:04:12	1	368.36	307.84	232.30	240.95	236.09	6.06	5.96	5.75	5.66	5.66	3971.92	43.23	4
2021-11-01 14:04:10	1	371.71	307.77	232.23	240.68	235.99	6.01	5.96	5.74	5.65	5.66	3970.40	43.19	4
2021-11-01 14:04:14	1	375.03	307.84	232.30	240.95	236.26	5.95	5.96	5.74	5.67	5.65	3971.92	43.24	4
2021-11-01 14:04:16	1	371.61	304.94	232.47	240.70	235.87	6.01	6.01	5.73	5.66	5.65	3968.87	43.33	4
2021-11-01 14:04:24	1	371.39	310.31	232.30	240.63	235.82	6.02	5.91	5.75	5.68	5.65	3971.92	43.25	4
2021-11-01 14:04:18	1	371.54	310.43	232.30	240.73	235.84	6.01	5.90	5.73	5.67	5.65	3970.40	43.35	4
2021-11-01 14:04:22	1	367.97	307.67	232.52	240.65	235.84	6.06	5.96	5.74	5.66	5.64	3970.40	43.29	4
2021-11-01 14:04:20	1	374.83	307.67	232.16	240.65	235.77	5.95	5.96	5.74	5.66	5.66	3970.40	43.26	4
2021-11-01 14:04:26	1	371.39	304.74	232.13	240.68	235.79	6.01	6.01	5.73	5.66	5.66	3970.40	43.27	4
2021-11-01 14:04:30	1	374.66	307.40	232.43	240.78	235.77	5.95	5.96	5.75	5.65	5.65	3968.87	43.34	4
2021-11-01 14:04:28	1	367.93	307.48	232.13	240.48	235.57	6.06	5.96	5.73	5.66	5.67	3967.35	43.31	4
2021-11-01 14:03:10	1	369.44	310.53	232.13	240.75	235.89	6.03	5.89	5.73	5.65	5.64	3965.82	43.27	4
2021-11-01 14:04:32	1	371.25	304.64	232.30	240.95	235.97	6.01	6.01	5.73	5.66	5.64	3968.87	43.22	4
2021-11-01 14:04:34	1	371.25	310.19	231.99	240.58	235.82	6.01	5.90	5.75	5.66	5.66	3968.87	43.20	4
2021-11-01 14:04:36	1	374.49	307.38	232.16	240.70	235.94	5.95	5.96	5.73	5.66	5.65	3965.82	43.23	4
2021-11-01 14:04:38	1	367.66	307.40	233.04	240.58	235.87	6.06	5.96	5.74	5.65	5.65	3967.35	43.29	4
2021-11-01 14:04:40	1	371.05	310.06	233.01	240.58	235.75	6.01	5.90	5.72	5.67	5.64	3967.35	43.33	4
2021-11-01 14:04:43	1	370.98	304.52	233.11	240.82	235.94	6.01	6.00	5.73	5.64	5.63	3965.82	43.33	4
2021-11-01 14:03:12	1	366.00	305.91	232.28	241.19	236.28	6.08	5.98	5.67	5.66	5.64	3962.77	43.25	4
2021-11-01 14:04:45	1	367.58	307.26	232.65	240.26	235.45	6.06	5.96	5.74	5.66	5.65	3965.82	43.34	4
2021-11-01 14:04:47	1	367.53	307.23	232.91	240.53	235.65	6.06	5.96	5.72	5.65	5.64	3964.29	43.29	4
2021-11-01 14:04:49	1	374.30	307.18	232.23	240.21	235.21	5.95	5.96	5.73	5.65	5.65	3962.77	43.25	4
2021-11-01 14:04:51	1	370.81	304.33	232.86	240.48	235.77	6.01	6.01	5.72	5.64	5.64	3962.77	43.33	4
2021-11-01 14:04:55	1	374.15	306.94	232.91	240.51	235.75	5.94	5.96	5.73	5.65	5.63	3961.24	43.27	4
2021-11-01 14:04:57	1	367.29	307.04	232.94	240.43	235.72	6.06	5.95	5.72	5.65	5.64	3959.72	43.35	4
2021-11-01 14:04:59	1	370.68	309.72	232.69	240.16	235.55	6.00	5.90	5.73	5.65	5.65	3958.19	43.26	4
2021-11-01 14:05:01	1	370.54	304.18	232.77	240.34	235.70	6.00	6.00	5.71	5.64	5.63	3953.61	43.34	4
2021-11-01 14:05:03	1	368.17	306.87	232.74	240.36	235.87	6.03	5.94	5.71	5.63	5.63	3953.61	43.35	4
2021-11-01 14:05:21	1	373.64	306.65	233.33	240.24	235.55	5.94	5.95	5.71	5.63	5.62	3950.56	43.36	4
2021-11-01 14:05:44	1	369.76	309.16	233.04	239.95	235.45	6.00	5.89	5.70	5.63	5.62	3944.46	43.27	4
2021-11-01 14:05:58	1	366.00	311.72	233.06	240.12	235.60	6.04	5.82	5.69	5.61	5.60	3935.30	43.33	4
2021-11-01 14:06:23	1	372.49	305.77	233.82	239.77	233.13	5.93	5.93	5.70	5.64	5.61	3929.20	43.40	4
2021-11-01 14:06:49	1	372.00	305.25	234.92	238.82	233.04	5.92	5.91	5.64	5.59	5.58	3913.94	43.37	4
2021-11-01 14:07:12	1	371.51	304.89	238.70	238.94	233.06	5.91	5.91	5.64	5.56	5.55	3901.73	43.41	4
2021-11-01 14:07:28	1	371.20	304.72	238.33	238.75	230.98	5.91	5.91	5.63	5.58	5.56	3900.21	43.40	4
2021-11-01 14:07:48	1	374.08	307.06	238.60	239.21	231.30	5.85	5.86	5.62	5.56	5.55	3895.63	43.45	4
2021-11-01 14:08:05	1	370.44	304.03	238.90	238.55	231.62	5.91	5.90	5.62	5.56	5.55	3889.52	43.48	4
2021-11-01 14:08:11	1	373.81	306.74	238.68	238.63	231.45	5.85	5.86	5.61	5.55	5.54	3892.58	43.41	4
2021-11-01 14:08:23	1	376.98	309.55	238.50	238.14	231.38	5.79	5.80	5.62	5.55	5.55	3889.52	43.49	4
2021-11-01 14:08:31	1	370.00	309.50	238.77	238.58	231.45	5.89	5.80	5.62	5.55	5.53	3883.42	43.41	4
2021-11-01 14:08:46	1	369.73	309.18	238.94	238.68	228.81	5.90	5.79	5.61	5.59	5.55	3878.84	43.57	4
2021-11-01 14:08:54	1	369.61	309.01	240.53	239.24	224.83	5.90	5.80	5.62	5.58	5.56	3878.84	43.50	4
2021-11-01 14:09:08	1	372.81	309.82	240.12	238.92	224.34	5.84	5.77	5.62	5.57	5.57	3874.27	43.55	4
2021-11-01 14:09:59	1	370.54	310.65	236.33	243.17	233.48	5.86	5.73	5.55	5.49	5.47	3860.53	43.61	4
2021-11-01 14:10:20	1	370.07	304.79	237.02	243.34	234.11	5.86	5.84	5.53	5.45	5.47	3860.53	43.60	4
2021-11-01 14:10:43	1	370.86	309.94	237.28	243.61	234.09	5.85	5.75	5.54	5.45	5.46	3862.06	43.67	4
2021-11-01 14:11:16	1	373.81	312.41	236.55	244.73	230.06	5.79	5.68	5.53	5.47	5.47	3849.85	43.74	4
2021-11-01 14:11:34	1	373.42	306.50	236.38	244.10	233.72	5.79	5.80	5.53	5.48	5.44	3851.38	43.71	4
2021-11-01 14:11:55	1	373.00	311.80	231.89	244.68	233.96	5.78	5.67	5.52	5.44	5.47	3836.12	43.77	4
2021-11-01 14:12:19	1	369.07	305.77	232.38	245.10	233.11	5.83	5.78	5.52	5.45	5.45	3831.54	43.85	4
2021-11-01 14:12:48	1	368.49	308.11	238.14	246.66	237.11	5.82	5.72	5.43	5.37	5.36	3822.38	43.87	4
2021-11-01 14:04:53	1	370.83	309.84	233.13	240.41	235.65	6.01	5.90	5.72	5.65	5.65	3964.29	43.25	4
2021-11-01 14:05:23	1	369.05	309.36	233.72	240.41	235.82	6.02	5.89	5.70	5.62	5.62	3947.51	43.30	4
2021-11-01 14:05:38	1	369.83	309.23	233.23	239.92	235.40	6.00	5.89	5.71	5.64	5.61	3942.93	43.31	4
2021-11-01 14:06:06	1	365.83	306.11	234.62	240.65	232.06	6.04	5.93	5.68	5.61	5.61	3933.78	43.38	4
2021-11-01 14:06:27	1	372.44	311.16	233.67	239.80	233.01	5.93	5.81	5.69	5.63	5.61	3923.09	43.27	4
2021-11-01 14:06:43	1	372.00	310.99	234.48	238.70	233.45	5.92	5.81	5.67	5.62	5.59	3916.99	43.46	4
2021-11-01 14:07:10	1	371.56	304.99	238.80	239.11	233.35	5.91	5.91	5.63	5.56	5.55	3904.78	43.33	4
2021-11-01 14:07:36	1	371.05	310.09	239.24	239.53	231.77	5.91	5.80	5.61	5.52	5.53	3900.21	43.43	4
2021-11-01 14:07:57	1	373.98	306.99	238.90	238.50	231.25	5.85	5.85	5.61	5.60	5.54	3892.58	43.48	4
2021-11-01 14:08:13	1	370.29	309.48	238.60	238.38	231.28	5.91	5.80	5.62	5.56	5.53	3889.52	43.49	4
2021-11-01 14:08:40	1	376.64	309.40	239.04	238.72	231.79	5.78	5.80	5.59	5.55	5.51	3878.84	43.50	4
2021-11-01 14:09:06	1	372.81	305.99	240.63	239.36	224.71	5.84	5.84	5.62	5.59	5.57	3874.27	43.57	4
2021-11-01 14:09:31	1	375.69	308.48	239.92	239.21	225.83	5.79	5.80	5.61	5.58	5.55	3871.21	43.54	4
2021-11-01 14:09:55	1	368.32	307.99	236.62	243.39	233.94	5.89	5.79	5.52	5.48	5.46	3862.06	43.60	4
2021-11-01 14:10:18	1	374.71	307.62	237.09	243.39	234.21	5.79	5.79	5.54	5.46	5.45	3862.06	43.62	4
2021-11-01 14:10:40	1	370.98	309.99	237.04	243.56	233.89	5.85	5.74	5.53	5.47	5.47	3863.58	43.62	4
2021-11-01 14:11:04	1	377.40	309.75	235.94	243.68	233.79	5.73	5.74	5.53	5.44	5.46	3855.95	43.68	4
2021-11-01 14:11:22	1	376.98	309.48	235.99	243.95	233.30	5.73	5.74	5.53	5.47	5.44	3851.38	43.74	4
2021-11-01 14:11:36	1	373.35	312.11	236.23	243.92	233.52	5.79	5.68	5.53	5.47	5.46	3848.33	43.73	4
2021-11-01 14:11:59	1	369.39	308.92	232.38	244.68	232.69	5.83	5.73	5.56	5.44	5.45	3830.01	43.75	4
2021-11-01 14:12:13	1	372.64	305.96	232.45	244.49	232.82	5.78	5.78	5.58	5.44	5.44	3831.54	43.76	4
2021-11-01 14:12:42	1	372.00	305.42	232.47	247.73	237.97	5.77	5.76	5.46	5.38	5.38	3817.81	43.85	4
2021-11-01 14:05:05	1	373.83	306.96	232.96	240.58	235.92	5.94	5.94	5.72	5.62	5.62	3952.09	43.34	4
2021-11-01 14:05:25	1	370.17	309.31	233.65	240.34	235.87	6.00	5.90	5.70	5.62	5.62	3949.03	43.29	4
2021-11-01 14:05:48	1	366.22	306.33	233.45	240.38	235.82	6.04	5.93	5.69	5.62	5.62	3939.88	43.27	4
2021-11-01 14:06:08	1	369.32	308.84	234.67	240.68	232.11	6.00	5.88	5.70	5.63	5.63	3935.30	43.37	4
2021-11-01 14:06:20	1	375.86	305.89	234.11	240.09	233.23	5.87	5.93	5.68	5.62	5.60	3927.67	43.39	4
2021-11-01 14:06:53	1	371.76	308.04	238.63	238.24	232.91	5.91	5.86	5.65	5.59	5.57	3912.41	43.38	4
2021-11-01 14:07:16	1	374.79	307.65	238.77	238.87	233.11	5.84	5.85	5.59	5.52	5.51	3900.21	43.37	4
2021-11-01 14:07:38	1	371.03	304.52	238.19	239.16	231.57	5.91	5.91	5.64	5.57	5.55	3898.68	43.45	4
2021-11-01 14:07:59	1	370.61	309.75	239.07	238.75	231.74	5.90	5.80	5.62	5.56	5.54	3891.05	43.48	4
2021-11-01 14:08:35	1	373.35	312.07	238.99	238.70	231.79	5.84	5.73	5.60	5.54	5.52	3877.32	43.50	4
2021-11-01 14:08:56	1	373.03	306.28	240.43	239.31	224.78	5.84	5.84	5.63	5.57	5.57	3877.32	43.56	4
2021-11-01 14:09:23	1	372.47	305.77	240.21	239.48	224.66	5.84	5.84	5.61	5.57	5.55	3871.21	43.55	4
2021-11-01 14:09:43	1	372.05	310.97	237.38	242.87	228.71	5.84	5.73	5.57	5.52	5.51	3862.06	43.61	4
2021-11-01 14:10:05	1	375.10	307.77	236.62	243.46	233.82	5.78	5.79	5.54	5.50	5.47	3862.06	43.62	4
2021-11-01 14:10:12	1	371.54	310.48	236.92	243.29	233.99	5.84	5.74	5.54	5.47	5.47	3862.06	43.62	4
2021-11-01 14:10:22	1	371.17	310.33	236.87	243.41	232.50	5.85	5.74	5.55	5.48	5.48	3863.58	43.60	4
2021-11-01 14:10:34	1	374.52	307.33	236.87	243.36	233.69	5.79	5.80	5.54	5.48	5.48	3865.11	43.70	4
2021-11-01 14:10:45	1	370.83	309.99	237.06	243.27	233.79	5.84	5.74	5.54	5.46	5.47	3860.53	43.73	4
2021-11-01 14:10:58	1	377.42	309.84	236.14	243.31	233.79	5.73	5.74	5.54	5.48	5.47	3857.48	43.67	4
2021-11-01 14:11:45	1	376.54	311.82	236.26	243.90	233.69	5.73	5.68	5.51	5.47	5.45	3845.27	43.74	4
2021-11-01 14:12:03	1	372.74	306.03	232.13	244.83	233.13	5.77	5.77	5.52	5.44	5.45	3828.49	43.77	4
2021-11-01 14:12:25	1	368.80	308.50	233.30	245.93	233.89	5.83	5.73	5.49	5.41	5.43	3828.49	43.87	4
2021-11-01 14:12:52	1	371.78	305.28	238.33	246.59	237.04	5.77	5.76	5.43	5.36	5.35	3819.33	43.87	4
2021-11-01 14:05:07	1	370.51	309.58	232.72	240.36	235.65	6.00	5.89	5.72	5.63	5.62	3947.51	43.29	4
2021-11-01 14:05:13	1	366.92	306.74	233.06	240.16	235.53	6.05	5.94	5.71	5.64	5.62	3949.03	43.34	4
2021-11-01 14:05:27	1	372.37	306.62	233.28	240.07	235.70	5.96	5.94	5.71	5.63	5.64	3949.03	43.30	4
2021-11-01 14:05:34	1	370.03	303.76	233.52	239.95	235.57	6.00	5.99	5.70	5.62	5.62	3945.98	43.35	4
2021-11-01 14:05:50	1	373.00	311.87	233.23	240.36	235.72	5.94	5.82	5.68	5.62	5.60	3938.35	43.26	4
2021-11-01 14:05:56	1	372.95	306.23	233.16	240.31	235.84	5.94	5.94	5.68	5.61	5.61	3938.35	43.37	4
2021-11-01 14:06:12	1	371.29	305.99	234.50	239.99	231.69	5.96	5.93	5.69	5.63	5.62	3930.72	43.40	4
2021-11-01 14:06:16	1	369.17	308.65	234.65	240.58	233.67	5.99	5.87	5.67	5.61	5.60	3930.72	43.37	4
2021-11-01 14:06:35	1	365.31	305.55	234.01	239.97	233.26	6.02	5.92	5.67	5.60	5.59	3918.52	43.37	4
2021-11-01 14:06:39	1	368.78	308.31	234.77	240.60	233.91	5.98	5.87	5.65	5.58	5.57	3918.52	43.39	4
2021-11-01 14:06:55	1	368.51	308.13	238.80	238.50	233.16	5.97	5.86	5.63	5.58	5.55	3912.41	43.36	4
2021-11-01 14:07:01	1	371.59	308.89	238.55	238.19	232.99	5.91	5.84	5.63	5.58	5.56	3909.36	43.46	4
2021-11-01 14:07:42	1	374.27	307.26	238.50	238.99	231.25	5.85	5.86	5.61	5.58	5.55	3895.63	43.45	4
2021-11-01 14:08:21	1	373.61	309.75	238.70	238.24	231.42	5.85	5.80	5.62	5.56	5.55	3891.05	43.42	4
2021-11-01 14:08:44	1	376.59	309.18	238.65	238.09	228.54	5.79	5.80	5.62	5.58	5.56	3880.37	43.51	4
2021-11-01 14:09:04	1	369.44	311.67	240.51	239.33	224.69	5.90	5.74	5.61	5.58	5.56	3875.79	43.55	4
2021-11-01 14:09:29	1	372.39	305.72	239.99	239.36	226.15	5.84	5.84	5.62	5.55	5.55	3871.21	43.51	4
2021-11-01 14:09:51	1	371.86	305.25	236.58	243.24	233.77	5.84	5.83	5.55	5.46	5.47	3862.06	43.58	4
2021-11-01 14:10:01	1	371.64	305.08	236.43	243.36	233.69	5.84	5.83	5.53	5.48	5.47	3860.53	43.62	4
2021-11-01 14:10:26	1	367.68	307.48	236.82	243.19	233.52	5.90	5.80	5.55	5.48	5.48	3865.11	43.63	4
2021-11-01 14:10:47	1	374.32	307.16	237.36	243.02	233.91	5.79	5.80	5.57	5.46	5.45	3859.01	43.64	4
2021-11-01 14:11:08	1	373.93	312.46	236.09	243.78	233.91	5.79	5.68	5.53	5.46	5.46	3854.43	43.74	4
2021-11-01 14:11:28	1	373.49	309.58	236.11	243.78	233.40	5.79	5.74	5.54	5.46	5.46	3851.38	43.74	4
2021-11-01 14:11:43	1	373.22	311.92	235.92	243.58	233.50	5.79	5.68	5.53	5.46	5.45	3843.75	43.74	4
2021-11-01 14:12:11	1	372.69	311.48	232.21	244.71	232.84	5.78	5.67	5.53	5.47	5.47	3830.01	43.83	4
2021-11-01 14:12:34	1	372.20	311.14	233.06	246.17	236.65	5.77	5.67	5.47	5.41	5.41	3826.96	43.84	4
2021-11-01 14:12:46	1	375.30	308.06	233.82	247.66	237.65	5.72	5.72	5.45	5.36	5.37	3822.38	43.88	4
2021-11-01 14:13:06	1	371.39	310.55	241.87	245.17	240.63	5.76	5.66	5.39	5.32	5.29	3819.33	43.86	4
2021-11-01 14:05:09	1	370.44	303.96	233.16	240.75	235.79	6.00	5.99	5.69	5.63	5.62	3949.03	43.29	4
2021-11-01 14:05:29	1	366.58	306.55	233.82	240.14	235.92	6.05	5.95	5.69	5.62	5.62	3947.51	43.35	4
2021-11-01 14:05:52	1	369.49	309.01	232.79	239.99	235.40	6.00	5.88	5.70	5.62	5.62	3936.83	43.32	4
2021-11-01 14:06:14	1	365.58	305.99	234.65	240.31	232.03	6.04	5.93	5.68	5.62	5.62	3927.67	43.33	4
2021-11-01 14:06:37	1	375.49	308.33	234.48	239.99	233.30	5.86	5.87	5.68	5.64	5.59	3918.52	43.34	4
2021-11-01 14:06:59	1	371.78	305.20	239.21	238.80	233.57	5.91	5.91	5.62	5.57	5.55	3910.89	43.36	4
2021-11-01 14:07:20	1	371.37	310.38	238.68	238.87	232.82	5.90	5.80	5.62	5.58	5.54	3901.73	43.41	4
2021-11-01 14:07:22	1	371.29	307.45	238.92	239.31	233.11	5.91	5.86	5.62	5.55	5.54	3900.21	43.45	4
2021-11-01 14:07:50	1	367.39	307.11	238.65	239.04	231.20	5.95	5.85	5.62	5.58	5.55	3894.10	43.42	4
2021-11-01 14:08:07	1	370.46	309.60	239.02	238.70	231.69	5.91	5.80	5.62	5.54	5.54	3892.58	43.49	4
2021-11-01 14:08:25	1	370.10	309.55	238.50	238.19	231.42	5.90	5.80	5.62	5.58	5.54	3889.52	43.49	4
2021-11-01 14:08:52	1	376.37	309.11	240.38	239.33	224.86	5.78	5.80	5.61	5.60	5.57	3877.32	43.50	4
2021-11-01 14:09:14	1	372.56	311.50	240.43	239.19	224.54	5.85	5.74	5.61	5.58	5.57	3874.27	43.52	4
2021-11-01 14:09:16	1	372.66	305.84	240.58	239.07	224.44	5.84	5.84	5.63	5.57	5.56	3872.74	43.51	4
2021-11-01 14:09:45	1	371.98	305.38	236.26	242.80	233.28	5.84	5.83	5.55	5.48	5.48	3862.06	43.59	4
2021-11-01 14:10:03	1	371.51	307.91	236.67	243.51	233.89	5.84	5.79	5.55	5.47	5.47	3862.06	43.62	4
2021-11-01 14:10:24	1	371.17	307.52	236.89	243.44	233.74	5.85	5.80	5.54	5.46	5.47	3862.06	43.65	4
2021-11-01 14:10:49	1	374.18	307.08	237.26	243.14	233.94	5.79	5.80	5.54	5.47	5.48	3860.53	43.69	4
2021-11-01 14:11:12	1	370.39	309.62	235.94	243.66	233.72	5.84	5.74	5.54	5.47	5.47	3854.43	43.72	4
2021-11-01 14:11:30	1	370.00	309.38	236.09	243.80	233.35	5.84	5.74	5.52	5.47	5.46	3851.38	43.74	4
2021-11-01 14:11:41	1	369.88	309.26	235.99	243.56	233.26	5.84	5.74	5.53	5.47	5.46	3846.80	43.70	4
2021-11-01 14:11:51	1	376.37	308.99	236.58	243.63	233.40	5.72	5.73	5.54	5.44	5.42	3840.70	43.77	4
2021-11-01 14:12:01	1	376.23	308.82	232.13	244.75	232.89	5.71	5.73	5.52	5.44	5.45	3826.96	43.85	4
2021-11-01 14:12:50	1	371.73	310.82	238.11	246.63	237.16	5.77	5.66	5.42	5.36	5.35	3820.86	43.87	4
2021-11-01 14:05:11	1	372.61	306.82	233.33	240.73	235.94	5.97	5.94	5.70	5.62	5.62	3950.56	43.29	4
2021-11-01 14:05:40	1	373.15	306.43	233.55	240.24	235.67	5.94	5.94	5.68	5.62	5.61	3942.93	43.31	4
2021-11-01 14:06:04	1	372.54	311.63	234.65	240.65	232.08	5.94	5.82	5.69	5.63	5.62	3936.83	43.34	4
2021-11-01 14:06:25	1	372.37	308.28	233.89	239.95	233.26	5.92	5.88	5.69	5.62	5.61	3926.15	43.37	4
2021-11-01 14:06:47	1	368.49	308.01	234.72	240.09	233.84	5.98	5.87	5.67	5.59	5.59	3915.47	43.37	4
2021-11-01 14:07:05	1	368.19	307.89	238.94	238.53	233.48	5.96	5.85	5.64	5.57	5.55	3906.31	43.38	4
2021-11-01 14:07:30	1	371.22	310.23	238.77	239.14	231.23	5.91	5.80	5.62	5.57	5.55	3903.26	43.48	4
2021-11-01 14:07:46	1	370.88	310.01	238.63	239.04	231.20	5.91	5.80	5.62	5.57	5.55	3897.15	43.46	4
2021-11-01 14:07:53	1	370.73	309.79	238.50	238.99	231.20	5.91	5.80	5.62	5.58	5.55	3894.10	43.42	4
2021-11-01 14:08:03	1	373.88	306.87	239.21	238.92	231.86	5.85	5.85	5.61	5.55	5.54	3892.58	43.40	4
2021-11-01 14:08:29	1	373.47	306.62	238.77	238.60	231.52	5.84	5.84	5.61	5.55	5.53	3883.42	43.42	4
2021-11-01 14:08:48	1	373.03	311.89	239.38	238.43	229.20	5.84	5.73	5.60	5.54	5.54	3875.79	43.50	4
2021-11-01 14:09:12	1	376.10	308.84	240.65	239.26	224.69	5.79	5.79	5.61	5.59	5.55	3871.21	43.50	4
2021-11-01 14:09:20	1	369.22	308.57	240.48	239.38	224.44	5.90	5.80	5.62	5.57	5.56	3874.27	43.56	4
2021-11-01 14:09:35	1	372.20	305.55	235.48	240.58	226.74	5.84	5.84	5.62	5.58	5.55	3866.64	43.57	4
2021-11-01 14:09:53	1	371.86	310.82	236.92	243.27	233.87	5.84	5.73	5.53	5.48	5.46	3863.58	43.53	4
2021-11-01 14:10:14	1	371.39	304.86	236.87	243.31	233.96	5.84	5.84	5.54	5.46	5.46	3862.06	43.60	4
2021-11-01 14:10:38	1	377.79	304.50	237.21	243.66	234.09	5.73	5.84	5.52	5.46	5.46	3862.06	43.63	4
2021-11-01 14:11:00	1	374.00	306.94	236.09	243.73	234.09	5.79	5.80	5.53	5.46	5.45	3857.48	43.67	4
2021-11-01 14:11:06	1	370.54	309.67	236.31	243.61	233.79	5.84	5.74	5.56	5.44	5.45	3855.95	43.71	4
2021-11-01 14:11:18	1	373.81	306.87	236.06	244.10	233.30	5.79	5.79	5.53	5.44	5.47	3852.90	43.68	4
2021-11-01 14:11:26	1	373.59	306.60	235.97	243.51	232.96	5.79	5.79	5.54	5.46	5.47	3851.38	43.71	4
2021-11-01 14:12:05	1	372.78	311.67	232.25	244.83	232.99	5.77	5.66	5.53	5.44	5.46	3826.96	43.78	4
2021-11-01 14:12:23	1	372.37	307.60	232.91	245.58	233.60	5.78	5.75	5.51	5.44	5.44	3830.01	43.83	4
2021-11-01 14:12:40	1	375.42	310.99	234.35	248.05	238.16	5.71	5.66	5.44	5.34	5.36	3820.86	43.85	4
2021-11-01 14:13:00	1	371.49	310.72	238.65	246.78	237.26	5.77	5.66	5.42	5.37	5.34	3819.33	43.93	4
2021-11-01 14:05:17	1	370.29	309.43	233.99	241.12	236.45	6.00	5.89	5.69	5.60	5.61	3950.56	43.31	4
2021-11-01 14:05:46	1	369.66	309.23	233.50	239.73	235.26	6.00	5.88	5.74	5.61	5.61	3942.93	43.28	4
2021-11-01 14:06:10	1	369.12	308.79	234.23	240.26	231.82	5.99	5.88	5.70	5.63	5.62	3932.25	43.41	4
2021-11-01 14:06:29	1	368.95	308.43	233.89	239.68	233.06	5.98	5.87	5.68	5.61	5.60	3921.57	43.41	4
2021-11-01 14:06:41	1	371.91	305.45	233.77	239.58	233.01	5.93	5.92	5.68	5.61	5.60	3918.52	43.38	4
2021-11-01 14:07:03	1	374.96	307.84	239.09	238.72	233.62	5.85	5.86	5.61	5.56	5.54	3907.84	43.42	4
2021-11-01 14:07:24	1	367.90	307.55	238.77	239.26	231.50	5.95	5.85	5.63	5.58	5.55	3900.21	43.38	4
2021-11-01 14:07:32	1	374.59	307.38	238.97	239.26	231.33	5.85	5.86	5.62	5.55	5.55	3900.21	43.39	4
2021-11-01 14:07:44	1	370.78	304.47	238.55	239.09	231.28	5.91	5.90	5.61	5.57	5.55	3895.63	43.42	4
2021-11-01 14:08:09	1	373.74	306.96	238.85	238.75	231.60	5.86	5.86	5.62	5.58	5.55	3894.10	43.46	4
2021-11-01 14:08:27	1	373.52	312.24	238.53	238.28	231.33	5.84	5.74	5.61	5.55	5.53	3884.95	43.39	4
2021-11-01 14:08:50	1	366.09	306.30	240.26	239.16	225.05	5.94	5.84	5.61	5.56	5.55	3872.74	43.54	4
2021-11-01 14:09:10	1	369.32	308.74	240.56	239.29	224.64	5.89	5.79	5.61	5.59	5.56	3874.27	43.53	4
2021-11-01 14:09:33	1	368.80	308.35	235.40	240.46	226.59	5.90	5.80	5.63	5.59	5.57	3866.64	43.61	4
2021-11-01 14:09:57	1	375.13	307.96	236.72	243.51	234.06	5.78	5.79	5.54	5.47	5.47	3863.58	43.57	4
2021-11-01 14:10:16	1	367.95	307.62	237.11	243.27	233.94	5.89	5.79	5.53	5.48	5.46	3863.58	43.62	4
2021-11-01 14:10:36	1	367.46	307.38	237.33	243.51	233.99	5.90	5.80	5.53	5.47	5.45	3862.06	43.69	4
2021-11-01 14:11:02	1	374.05	312.55	236.06	243.63	233.91	5.79	5.69	5.54	5.48	5.46	3857.48	43.67	4
2021-11-01 14:11:20	1	370.34	309.45	235.79	243.80	233.06	5.84	5.74	5.54	5.46	5.46	3852.90	43.73	4
2021-11-01 14:11:32	1	376.86	312.04	236.06	243.75	233.38	5.73	5.69	5.52	5.46	5.45	3849.85	43.74	4
2021-11-01 14:11:53	1	369.54	307.13	231.91	244.88	234.09	5.83	5.76	5.52	5.45	5.46	3836.12	43.75	4
2021-11-01 14:12:07	1	376.06	308.79	232.18	244.73	232.99	5.72	5.73	5.52	5.45	5.46	3828.49	43.80	4
2021-11-01 14:12:30	1	372.15	305.62	232.67	245.93	236.43	5.78	5.78	5.49	5.41	5.40	3830.01	43.79	4
2021-11-01 14:12:36	1	374.30	308.28	233.06	246.34	236.70	5.74	5.73	5.47	5.44	5.40	3822.38	43.84	4
2021-11-01 14:12:56	1	375.01	307.94	238.55	246.59	237.04	5.71	5.72	5.42	5.37	5.34	3817.81	43.87	4
2021-11-01 14:13:04	1	368.02	307.84	242.95	245.54	236.33	5.82	5.72	5.40	5.35	5.32	3817.81	43.80	4
2021-11-01 14:05:15	1	370.42	303.96	233.45	240.48	235.97	6.00	5.99	5.70	5.63	5.61	3950.56	43.25	4
2021-11-01 14:05:42	1	366.29	311.92	233.60	240.21	235.72	6.05	5.82	5.69	5.62	5.61	3939.88	43.29	4
2021-11-01 14:06:00	1	369.32	308.94	234.11	241.09	236.65	5.99	5.88	5.67	5.61	5.60	3939.88	43.29	4
2021-11-01 14:06:31	1	368.71	308.38	233.74	239.65	233.08	5.98	5.87	5.69	5.63	5.61	3924.62	43.37	4
2021-11-01 14:06:51	1	371.78	310.82	238.90	238.58	233.23	5.91	5.80	5.62	5.58	5.56	3913.94	43.42	4
2021-11-01 14:07:14	1	369.15	307.72	238.65	238.60	232.84	5.94	5.85	5.63	5.57	5.55	3903.26	43.38	4
2021-11-01 14:07:40	1	367.58	307.30	238.55	239.02	231.25	5.95	5.86	5.62	5.58	5.55	3897.15	43.43	4
2021-11-01 14:08:17	1	370.22	312.33	238.58	238.26	231.35	5.91	5.74	5.62	5.58	5.55	3892.58	43.51	4
2021-11-01 14:08:37	1	373.37	306.50	238.80	238.60	231.57	5.84	5.84	5.59	5.54	5.53	3877.32	43.50	4
2021-11-01 14:09:00	1	369.66	308.94	240.63	239.58	225.00	5.89	5.80	5.61	5.57	5.56	3875.79	43.58	4
2021-11-01 14:09:27	1	372.34	311.31	240.07	239.48	226.13	5.85	5.74	5.61	5.57	5.55	3872.74	43.52	4
2021-11-01 14:09:47	1	375.37	308.21	236.50	242.95	233.43	5.79	5.79	5.55	5.48	5.48	3865.11	43.62	4
2021-11-01 14:10:08	1	368.12	305.16	236.48	243.51	233.65	5.89	5.84	5.53	5.48	5.47	3862.06	43.62	4
2021-11-01 14:10:30	1	377.94	304.52	236.80	243.17	233.52	5.73	5.85	5.53	5.48	5.46	3862.06	43.65	4
2021-11-01 14:10:54	1	377.64	309.82	237.11	243.29	233.99	5.73	5.74	5.52	5.47	5.45	3855.95	43.73	4
2021-11-01 14:11:14	1	377.25	309.65	235.79	243.56	233.77	5.73	5.74	5.54	5.49	5.46	3851.38	43.68	4
2021-11-01 14:11:38	1	376.71	309.23	236.09	243.68	233.38	5.73	5.74	5.51	5.44	5.45	3846.80	43.69	4
2021-11-01 14:11:57	1	372.95	306.08	231.96	244.53	233.89	5.77	5.78	5.52	5.46	5.45	3831.54	43.76	4
2021-11-01 14:12:17	1	375.93	308.60	232.40	244.97	233.04	5.73	5.73	5.55	5.48	5.46	3831.54	43.80	4
2021-11-01 14:12:32	1	372.15	311.21	232.89	246.15	236.53	5.78	5.67	5.48	5.43	5.41	3828.49	43.79	4
2021-11-01 14:12:44	1	371.91	310.94	233.91	247.68	237.70	5.77	5.66	5.46	5.38	5.37	3820.86	43.89	4
2021-11-01 14:12:54	1	368.27	307.99	238.50	246.56	236.97	5.82	5.72	5.43	5.34	5.34	3819.33	43.87	4
2021-11-01 14:05:19	1	367.95	306.55	233.55	240.70	236.01	6.04	5.95	5.71	5.63	5.61	3950.56	43.30	4
2021-11-01 14:05:36	1	369.95	311.97	233.62	240.09	235.72	6.00	5.83	5.69	5.62	5.61	3945.98	43.30	4
2021-11-01 14:06:02	1	369.24	308.89	234.38	240.43	231.79	6.00	5.88	5.70	5.63	5.63	3936.83	43.36	4
2021-11-01 14:06:18	1	369.02	308.65	234.16	240.12	233.18	5.98	5.87	5.69	5.62	5.61	3929.20	43.38	4
2021-11-01 14:06:45	1	368.51	308.13	234.18	239.48	233.18	5.98	5.87	5.67	5.60	5.60	3918.52	43.36	4
2021-11-01 14:07:08	1	371.56	310.55	238.80	238.75	233.45	5.91	5.80	5.62	5.56	5.54	3904.78	43.40	4
2021-11-01 14:07:26	1	374.62	307.52	238.26	238.68	230.96	5.85	5.85	5.64	5.57	5.56	3900.21	43.46	4
2021-11-01 14:08:01	1	373.93	306.91	238.82	238.53	231.45	5.85	5.85	5.62	5.59	5.54	3891.05	43.49	4
2021-11-01 14:08:19	1	373.66	306.77	238.60	238.24	231.45	5.85	5.86	5.63	5.56	5.55	3892.58	43.39	4
2021-11-01 14:08:42	1	369.93	309.28	239.16	238.97	232.01	5.89	5.80	5.59	5.54	5.52	3880.37	43.50	4
2021-11-01 14:09:02	1	376.30	308.94	240.82	239.58	224.86	5.79	5.80	5.61	5.58	5.55	3874.27	43.55	4
2021-11-01 14:09:18	1	375.96	308.67	240.58	239.75	224.71	5.79	5.80	5.60	5.58	5.55	3872.74	43.50	4
2021-11-01 14:09:37	1	372.08	311.09	238.04	242.90	229.15	5.84	5.73	5.56	5.52	5.52	3865.11	43.57	4
2021-11-01 14:09:39	1	368.66	308.21	237.14	242.19	228.42	5.88	5.78	5.58	5.53	5.52	3862.06	43.61	4
2021-11-01 14:09:49	1	368.54	308.09	234.60	243.49	234.28	5.88	5.79	5.55	5.51	5.48	3863.58	43.60	4
2021-11-01 14:10:32	1	371.00	310.16	236.72	243.31	233.67	5.85	5.75	5.56	5.48	5.48	3866.64	43.72	4
2021-11-01 14:10:56	1	367.19	307.08	237.36	243.22	233.99	5.89	5.79	5.52	5.45	5.46	3855.95	43.74	4
2021-11-01 14:11:24	1	370.24	312.19	236.09	244.02	233.33	5.84	5.69	5.54	5.47	5.47	3852.90	43.72	4
2021-11-01 14:11:49	1	373.05	311.80	236.16	243.78	233.50	5.78	5.68	5.51	5.46	5.44	3842.22	43.74	4
2021-11-01 14:12:15	1	370.44	308.67	232.25	244.68	232.91	5.81	5.73	5.53	5.47	5.46	3833.07	43.82	4
2021-11-01 14:12:38	1	368.61	308.35	233.65	247.10	237.38	5.81	5.72	5.45	5.38	5.38	3820.86	43.87	4
2021-11-01 14:12:58	1	371.59	305.08	238.63	246.61	237.24	5.77	5.76	5.43	5.36	5.35	3817.81	43.87	4
2021-11-01 14:05:31	1	370.10	309.38	233.89	240.24	236.01	6.00	5.89	5.71	5.62	5.62	3949.03	43.26	4
2021-11-01 14:05:54	1	369.51	309.11	233.23	240.38	236.09	5.99	5.88	5.68	5.62	5.61	3938.35	43.36	4
2021-11-01 14:06:33	1	372.20	311.09	234.23	240.07	233.45	5.92	5.81	5.68	5.61	5.60	3923.09	43.37	4
2021-11-01 14:06:57	1	370.59	310.65	238.90	238.38	233.08	5.93	5.80	5.65	5.55	5.55	3909.36	43.39	4
2021-11-01 14:07:18	1	368.00	304.86	238.65	238.85	232.89	5.95	5.90	5.62	5.55	5.54	3900.21	43.37	4
2021-11-01 14:07:34	1	367.63	307.43	239.04	239.31	231.52	5.96	5.85	5.62	5.57	5.55	3898.68	43.43	4
2021-11-01 14:07:55	1	370.66	304.23	238.94	238.65	231.40	5.90	5.90	5.60	5.56	5.53	3891.05	43.44	4
2021-11-01 14:08:15	1	370.27	309.62	238.58	238.65	231.38	5.91	5.80	5.62	5.60	5.55	3894.10	43.48	4
2021-11-01 14:08:33	1	369.98	309.38	238.97	238.68	231.69	5.89	5.79	5.60	5.53	5.51	3880.37	43.53	4
2021-11-01 14:08:58	1	372.86	311.75	240.87	239.38	225.00	5.85	5.74	5.62	5.58	5.55	3877.32	43.48	4
2021-11-01 14:09:25	1	372.39	311.36	240.14	239.43	224.61	5.85	5.74	5.62	5.56	5.56	3872.74	43.55	4
2021-11-01 14:09:41	1	375.45	308.23	237.02	242.87	228.62	5.78	5.78	5.58	5.51	5.51	3862.06	43.52	4
2021-11-01 14:10:10	1	371.56	310.53	236.75	243.36	233.87	5.84	5.74	5.54	5.46	5.47	3863.58	43.62	4
2021-11-01 14:10:28	1	374.52	310.16	236.65	242.75	233.11	5.79	5.75	5.58	5.47	5.47	3865.11	43.64	4
2021-11-01 14:10:51	1	370.78	309.87	237.14	243.36	234.09	5.84	5.74	5.53	5.47	5.46	3857.48	43.64	4
2021-11-01 14:11:10	1	373.81	306.91	235.92	243.80	233.60	5.79	5.79	5.55	5.46	5.46	3854.43	43.63	4
2021-11-01 14:11:47	1	373.13	306.30	235.94	243.53	233.21	5.79	5.79	5.53	5.47	5.44	3843.75	43.74	4
2021-11-01 14:12:09	1	369.24	308.84	232.18	244.68	232.86	5.82	5.73	5.53	5.47	5.46	3830.01	43.86	4
2021-11-01 14:12:21	1	372.49	311.36	232.99	245.22	233.38	5.78	5.68	5.57	5.45	5.44	3831.54	43.76	4
2021-11-01 14:12:27	1	375.71	308.43	233.30	246.02	234.01	5.72	5.73	5.50	5.44	5.42	3830.01	43.83	4
2021-11-01 14:13:02	1	374.91	307.84	238.80	246.68	236.97	5.71	5.72	5.42	5.33	5.34	3816.28	43.88	4
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: kaco
--

COPY public.location (location_id, country, district, city, post_number, address) FROM stdin;
1	Republika Hrvatska	Sisačko-moslavačka	Glina	44400	Moje selo 459
2	Republika Hrvatska	Grad Zagreb	Zagreb	10000	Unska ulica 3
\.


--
-- Data for Name: owned_by; Type: TABLE DATA; Schema: public; Owner: kaco
--

COPY public.owned_by (plant_id, person_id) FROM stdin;
1	1
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: kaco
--

COPY public.person (person_id, first_name, last_name) FROM stdin;
1	Mile	Ja
2	Hrvoje	Rom
3	Žarko	Biser
4	Hrvoje	Rom
5	Mile	Ja
6	Žarko	Biser
\.


--
-- Data for Name: power_plant; Type: TABLE DATA; Schema: public; Owner: kaco
--

COPY public.power_plant (plant_id, plant_name, plant_type, nominal_power, deployment_date, location_id) FROM stdin;
1	Moje postrojenje	kupac_s_vlastitom_proizvodnjom	6500.00	2021-11-02 00:23:05.46	1
\.


--
-- Name: location_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kaco
--

SELECT pg_catalog.setval('public.location_location_id_seq', 4, true);


--
-- Name: person_person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kaco
--

SELECT pg_catalog.setval('public.person_person_id_seq', 6, true);


--
-- Name: power_plant_plant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kaco
--

SELECT pg_catalog.setval('public.power_plant_plant_id_seq', 2, true);


--
-- Name: data_entry data_entry_pkey; Type: CONSTRAINT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.data_entry
    ADD CONSTRAINT data_entry_pkey PRIMARY KEY ("timestamp", plant_id);


--
-- Name: location location_country_district_city_post_number_address_key; Type: CONSTRAINT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_country_district_city_post_number_address_key UNIQUE (country, district, city, post_number, address);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (location_id);


--
-- Name: owned_by owned_by_pkey; Type: CONSTRAINT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.owned_by
    ADD CONSTRAINT owned_by_pkey PRIMARY KEY (plant_id, person_id);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (person_id);


--
-- Name: power_plant power_plant_pkey; Type: CONSTRAINT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.power_plant
    ADD CONSTRAINT power_plant_pkey PRIMARY KEY (plant_id);


--
-- Name: power_plant power_plant_plant_name_key; Type: CONSTRAINT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.power_plant
    ADD CONSTRAINT power_plant_plant_name_key UNIQUE (plant_name);


--
-- Name: data_entry data_entry_plant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.data_entry
    ADD CONSTRAINT data_entry_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.power_plant(plant_id);


--
-- Name: owned_by owned_by_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.owned_by
    ADD CONSTRAINT owned_by_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.person(person_id);


--
-- Name: owned_by owned_by_plant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.owned_by
    ADD CONSTRAINT owned_by_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.power_plant(plant_id);


--
-- Name: power_plant power_plant_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kaco
--

ALTER TABLE ONLY public.power_plant
    ADD CONSTRAINT power_plant_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.location(location_id);


--
-- PostgreSQL database dump complete
--
