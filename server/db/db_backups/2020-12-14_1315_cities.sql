--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

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

DROP TABLE public.cities;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cities; Type: TABLE; Schema: public; Owner: trees
--

CREATE TABLE public.cities (
    id_city integer NOT NULL,
    city character varying(255),
    lng double precision,
    lat double precision,
    email character varying(255),
    contact character varying(255),
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    count integer
);


ALTER TABLE public.cities OWNER TO trees;

--
-- Name: cities_id_city_seq; Type: SEQUENCE; Schema: public; Owner: trees
--

ALTER TABLE public.cities ALTER COLUMN id_city ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cities_id_city_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: trees
--

COPY public.cities (id_city, city, lng, lat, email, contact, created, count) FROM stdin;
1	Alameda	-122.2765277	37.7708222	pw@alamedaca.gov	Alameda Public Works	2020-12-01 16:42:18.002152	27356
2	Oakland	-122.2748819	37.8047775	bartwright1@gmail.com	Sierra Club	2020-12-01 16:43:41.266059	2276
\.


--
-- Name: cities_id_city_seq; Type: SEQUENCE SET; Schema: public; Owner: trees
--

SELECT pg_catalog.setval('public.cities_id_city_seq', 3, true);


--
-- PostgreSQL database dump complete
--

