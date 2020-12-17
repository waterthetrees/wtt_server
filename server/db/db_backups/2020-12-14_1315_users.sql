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

DROP TRIGGER update_users_modtime ON public.users;
ALTER TABLE ONLY public.users DROP CONSTRAINT nickname_check;
ALTER TABLE ONLY public.users DROP CONSTRAINT email_check;
DROP TABLE public.users;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: trees
--

CREATE TABLE public.users (
    volunteer character varying(255),
    nickname character varying(255) NOT NULL,
    name character varying(255),
    picture character varying(255),
    email character varying(255) NOT NULL,
    zipcode character varying(255),
    created timestamp without time zone DEFAULT now() NOT NULL,
    modified timestamp without time zone,
    id_user integer NOT NULL
);


ALTER TABLE public.users OWNER TO trees;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: trees
--

ALTER TABLE public.users ALTER COLUMN id_user ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: trees
--

COPY public.users (volunteer, nickname, name, picture, email, zipcode, created, modified, id_user) FROM stdin;
rommims	rommims	Rose Rose	https://lh3.googleusercontent.com/-jfhgyeZ59Gc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnARtwcNuXmmCji9QOinCF_TKAXJg/s96-c/photo.jpg	rommims@gmail.com	94501	2020-11-11 06:12:44.912048	2020-11-11 06:15:47.706983	1
\N	goods	goods@swezlex.com	https://s.gravatar.com/avatar/98ae566ee494d7b7e7b1f1e82aeedf2b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fgo.png	goods@swezlex.com	\N	2020-11-12 12:21:59.309313	\N	2
alamedapw	alamedapw	Alameda Public Works	\N	pw@alamedaca.gov	94501	2020-12-01 15:27:35.515455	\N	3
\.


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: trees
--

SELECT pg_catalog.setval('public.users_id_user_seq', 3, true);


--
-- Name: users email_check; Type: CONSTRAINT; Schema: public; Owner: trees
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email_check UNIQUE (email);


--
-- Name: users nickname_check; Type: CONSTRAINT; Schema: public; Owner: trees
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT nickname_check UNIQUE (nickname);


--
-- Name: users update_users_modtime; Type: TRIGGER; Schema: public; Owner: trees
--

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- PostgreSQL database dump complete
--

