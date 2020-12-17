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

DROP TRIGGER update_treehistory_modtime ON public.treehistory;
DROP TABLE public.treehistory;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: treehistory; Type: TABLE; Schema: public; Owner: trees
--

CREATE TABLE public.treehistory (
    id_treehistory integer NOT NULL,
    id_tree integer,
    watered character varying(255),
    mulched character varying(255),
    pruned character varying(255),
    staked character varying(255),
    braced character varying(255),
    weeded character varying(255),
    comment text,
    volunteer character varying(255),
    date_visit timestamp without time zone,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified timestamp without time zone
);


ALTER TABLE public.treehistory OWNER TO trees;

--
-- Name: treehistory_id_treehistory_seq; Type: SEQUENCE; Schema: public; Owner: trees
--

ALTER TABLE public.treehistory ALTER COLUMN id_treehistory ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.treehistory_id_treehistory_seq
    START WITH 3000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: treehistory; Type: TABLE DATA; Schema: public; Owner: trees
--

COPY public.treehistory (id_treehistory, id_tree, watered, mulched, pruned, staked, braced, weeded, comment, volunteer, date_visit, created, modified) FROM stdin;
1	2452							"Plant in front yard, left of walkway, 10 feet behind sidewalk. Four feet back from top of embankment. - per ARB notes 11/29/2016"		2016-11-29 00:00:00	2020-09-10 19:56:22.162582	\N
2	2485							emailed care sheet -hhc 12/12/2016		2016-12-12 00:00:00	2020-09-10 19:56:22.165441	\N
3	2486							emailed care sheet -hhc 12/12/2016		2016-12-12 00:00:00	2020-09-10 19:56:22.166392	\N
4	1615									2017-03-27 00:00:00	2020-09-10 19:56:22.167138	\N
5	1617							"HHC 12/1/16: Emailed to explain out of grant area.  DKS 4/20/17: Stopped by, marked for USA. Wires overhead are not HV. Sidewalk 6'-6"" wide, could cut to make tree-well 3'-3"" and sidewalk 3'-3"" (with permission from City).  DKS 4/21/17: Emailed to explai"	DKS	2017-04-20 00:00:00	2020-09-10 19:56:22.167927	\N
6	2296								DKS	2017-05-20 00:00:00	2020-09-10 19:56:22.168642	\N
7	2297								DKS	2017-05-20 00:00:00	2020-09-10 19:56:22.169386	\N
8	2294								DKS	2017-05-20 00:00:00	2020-09-10 19:56:22.170114	\N
9	2292								DKS	2017-06-20 00:00:00	2020-09-10 19:56:22.170811	\N
10	2293								DKS	2017-06-20 00:00:00	2020-09-10 19:56:22.17161	\N
11	670	yes	yes	no	yes	yes	no		DF	2018-07-24 11:00:00	2020-09-10 19:56:22.172356	\N
12	671	yes	yes	no	yes	yes	no	madrone needs stake moved to straighten leaning tree. df	DF	2018-07-24 11:00:00	2020-09-10 19:56:22.173326	\N
13	672	yes	yes	no	yes	yes	no		DF	2018-07-24 11:00:00	2020-09-10 19:56:22.17416	\N
14	680	yes	yes	no	yes	yes	no		DF	2018-07-24 11:00:00	2020-09-10 19:56:22.174963	\N
15	450	yes	yes	yes	yes	yes	no	Lawn	DF	2018-07-25 11:00:00	2020-09-10 19:56:22.175733	\N
16	449	yes	yes	yes	yes	yes	no	"replaced bryesen hose, lawn"	DF	2018-07-25 11:00:00	2020-09-10 19:56:22.176748	\N
17	511	yes	yes	no	yes	yes	no		DF	2018-07-25 11:00:00	2020-09-10 19:56:22.177796	\N
18	512	yes	yes	no	yes	yes	no		DF	2018-07-25 11:00:00	2020-09-10 19:56:22.179324	\N
19	216								DF	2018-08-08 11:00:00	2020-09-10 19:56:22.180635	\N
20	215								DF	2018-08-08 11:00:00	2020-09-10 19:56:22.182644	\N
21	217								DF	2018-08-08 11:00:00	2020-09-10 19:56:22.18437	\N
22	231								DF	2018-08-08 11:00:00	2020-09-10 19:56:22.185925	\N
23	232								DF	2018-08-08 11:00:00	2020-09-10 19:56:22.187554	\N
24	233								DF	2018-08-08 11:00:00	2020-09-10 19:56:22.189165	\N
25	209	No	yes	no	no	no	no	Needs water	DF	2018-08-08 11:00:00	2020-09-10 19:56:22.190526	\N
26	210								DF	2018-08-08 11:00:00	2020-09-10 19:56:22.191693	\N
27	211								DF	2018-08-08 11:00:00	2020-09-10 19:56:22.192903	\N
28	138	yes	yes	no	no	no	no		DF	2018-08-08 11:00:00	2020-09-10 19:56:22.194647	\N
29	139	yes	yes	no	no	no	no		DF	2018-08-08 11:00:00	2020-09-10 19:56:22.195993	\N
30	137	yes	yes	no	no	no	no		DF	2018-08-08 11:00:00	2020-09-10 19:56:22.197436	\N
31	136	yes	yes	no	no	no	no		DF	2018-08-08 11:00:00	2020-09-10 19:56:22.199068	\N
32	581	No	yes	no	no	no	no		DF	2018-08-20 11:00:00	2020-09-10 19:56:22.200547	\N
33	651	yes	yes	no	na	na	no		DF	2018-08-20 11:00:00	2020-09-10 19:56:22.201719	\N
34	\N	No	yes	no	yes	yes	no	Needs water	DF	2018-08-20 11:00:00	2020-09-10 19:56:22.202684	\N
35	315	Yes		yes	Yes	Yes	Yes	new owner 2018	DKS	2018-08-28 11:00:00	2020-09-10 19:56:22.203692	\N
36	315	Yes	yes	yes	Yes	Yes	yes	new owner 2018	DKS	2018-09-16 11:00:00	2020-09-10 19:56:22.204794	\N
37	406	Yes	yes		Yes	no	yes	bamboo stakes	DKS	2018-09-16 11:00:00	2020-09-10 19:56:22.205813	\N
38	407	Yes	yes		Yes	no	yes	"trunk guard present 9/16/18; DB noted trunk dmg Aug ’18, bamboo stakes"	DKS	2018-09-16 11:00:00	2020-09-10 19:56:22.206829	\N
39	2084							"DKS June 2017: Lisa says overlong branches have bryesen off under their own weight, so she wants to get the damaged southern tree replaced.  DKS splinted the topmost branch of southern tree 7/01/17; tree is sending out new leaves along trunk. Wait and see"		2018-12-31 00:00:00	2020-09-10 19:56:22.207771	\N
40	2085							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.208808	\N
41	2767							"Google Earth shows pictures, Susan advised tree died so no more tree there, will loyes for small tree instead because of high-voltage wires; advised will spray USA tomorrow-hhc 11/27/2016; spyese with Arthur - he has sprayed but yet to submit an USA ticket"		2018-12-31 00:00:00	2020-09-10 19:56:22.2099	\N
42	2235							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.211162	\N
43	2329							"DKS: emailed 5/25/16, won't plant in '15-'16 season. She says she'll plant her own 5/31/16.  Emailed DKS again 1/2017 and now wants trees.  Marked for USA, but location of irrigation pipe in strip might interfere with digging. DKS asks Sarah about irriga"		2018-12-31 00:00:00	2020-09-10 19:56:22.212406	\N
44	2331							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.213672	\N
45	2330							"TRF arrived via email 11/7/16 -dks; ARB says RTP 12/19/16; hhc 1/5/2017 assessment FFS; existing planting strip is 2'6"" wide - long strip did not see USA; submitted a ticket; see where ARB marked tree to go - eastern redbud matches strip width - will sim"		2018-12-31 00:00:00	2020-09-10 19:56:22.214909	\N
46	1700							ask for TRF-hhc 2/2/2017; rec'd addendum; asked for actual TRF -hhc 2/16/2017; asked for tree species and advised may not get to other trees for a while; asked who is contact person for corre with BBCRS? -hhc 3/2/2017; emailed AR		2018-12-31 00:00:00	2020-09-10 19:56:22.215903	\N
47	2086							also got 1 CF tree on E 15th St - see TFO tab		2018-12-31 00:00:00	2020-09-10 19:56:22.21671	\N
48	2087							also got 1 CF tree on E 15th St - see TFO tab		2018-12-31 00:00:00	2020-09-10 19:56:22.217404	\N
49	2484							"DKS: emailed 5/25/16, won't plant in '15-'16 season; THEY TOLD ME IT WAS Yes; I WILL CHECK TODAY TO SEE IF SOIL HAS BEEN RESTORED. Per ARB 12/5/2016; emailed care sheet -12/12/2016"		2018-12-31 00:00:00	2020-09-10 19:56:22.21819	\N
50	2088							also got 1 CF tree on E 15th St - see TFO tab		2018-12-31 00:00:00	2020-09-10 19:56:22.218914	\N
51	2483							"DKS: emailed 5/25/16, won't plant in '15-'16 season; THEY TOLD ME IT WAS Yes; I WILL CHECK TODAY TO SEE IF SOIL HAS BEEN RESTORED. Per ARB 12/5/2016; emailed care sheet -12/12/2016"		2018-12-31 00:00:00	2020-09-10 19:56:22.219633	\N
52	2208							"-hhc 10/24/2016; strip is 27"" wide and has tall HV wires, needs notch -dks12/22/16; emailed to ask if want to choose diff species or unofficial tree -hhc 1/24/2017; will meet 2/7/2017 at 9 am -hhc 2/6/2017; unsure if want 2"		2018-12-31 00:00:00	2020-09-10 19:56:22.220496	\N
53	1969							also got 2 CF trees in backyard - see TFO tab		2018-12-31 00:00:00	2020-09-10 19:56:22.221166	\N
54	2249							emailed re: high volt wires -hhc 11/21/2016; want Large tree for yard and pay for small tree in front; concrete breakout and listed next steps -hc 11/29/2016; emailed to meet -hhc 1/4/2017; will meet 1/11 @ 11am -hhc 1/9/2017; marked concr		2018-12-31 00:00:00	2020-09-10 19:56:22.22182	\N
55	2435							"unofficial tree: planting strip is less than 36"" wide (verified by DKS on 2/7/2018)"		2018-12-31 00:00:00	2020-09-10 19:56:22.222619	\N
56	2436							"unofficial tree: planting strip is less than 36"" wide (verified by DKS on 2/7/2018)"		2018-12-31 00:00:00	2020-09-10 19:56:22.2234	\N
57	2437							"unofficial tree: planting strip is less than 36"" wide (verified by DKS on 2/7/2018)"		2018-12-31 00:00:00	2020-09-10 19:56:22.224745	\N
58	2438							"unofficial tree: planting strip is less than 36"" wide (verified by DKS on 2/7/2018)"		2018-12-31 00:00:00	2020-09-10 19:56:22.225954	\N
59	2441							"unofficial tree: planting strip is less than 36"" wide (verified by DKS on 2/7/2018).  2530 7th Ave does not exist; this is technically the back side of 2515 Ivy Drive."		2018-12-31 00:00:00	2020-09-10 19:56:22.226811	\N
60	2439							"unofficial tree: planting strip is less than 36"" wide (verified by DKS on 2/7/2018)"		2018-12-31 00:00:00	2020-09-10 19:56:22.227661	\N
61	2440							"unofficial tree: planting strip is less than 36"" wide (verified by DKS on 2/7/2018)"		2018-12-31 00:00:00	2020-09-10 19:56:22.228673	\N
141	2327							watch out for future split/rot at base of trunk		2018-12-31 00:00:00	2020-09-10 19:56:22.308971	\N
142	2606							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.309678	\N
62	2442							"unofficial tree: planting strip is less than 36"" wide (verified by DKS on 2/7/2018).  2530 7th Ave does not exist; this is technically the back side of 2515 Ivy Drive."		2018-12-31 00:00:00	2020-09-10 19:56:22.229665	\N
63	1588							also coordinated a CF tree for next-door neighbor at #1602 (see TFO tab)		2018-12-31 00:00:00	2020-09-10 19:56:22.230823	\N
64	2001							emailed next steps -hhc 1/18/2017; emailed to meet -hhc 2/22/2017; trying alternate dates -hhc 3/1/2017; emailed again to meet -hhc 3/13/2017; emailed again to meet -hhc 4/11/2017; emailed to advise can meet on a Tuesday; set to meet 4/18 @ 10AM -hhc 4/1		2018-12-31 00:00:00	2020-09-10 19:56:22.231656	\N
65	2093							emailed high V -hhc 2/15/2017; emailed tree list for both street and private property and asked if I should proceed with st tree -hhc 2/16/2017; asked whether they want both st and yard tree?; yes to both - emailed next steps -hhc 2/20/2017; emailed to m		2018-12-31 00:00:00	2020-09-10 19:56:22.232358	\N
66	2351							Ceanothus trees around parking lot are too small to qualify for CalFire		2018-12-31 00:00:00	2020-09-10 19:56:22.233104	\N
67	2352							Ceanothus trees around parking lot are too small to qualify for CalFire		2018-12-31 00:00:00	2020-09-10 19:56:22.233833	\N
68	2353							Ceanothus trees around parking lot are too small to qualify for CalFire		2018-12-31 00:00:00	2020-09-10 19:56:22.234708	\N
69	2117							Ceanothus trees around parking lot are too small to qualify for CalFire		2018-12-31 00:00:00	2020-09-10 19:56:22.235548	\N
70	2354							Ceanothus trees around parking lot are too small to qualify for CalFire		2018-12-31 00:00:00	2020-09-10 19:56:22.23651	\N
71	2355							Ceanothus trees around parking lot are too small to qualify for CalFire		2018-12-31 00:00:00	2020-09-10 19:56:22.237361	\N
72	2356							Ceanothus trees around parking lot are too small to qualify for CalFire		2018-12-31 00:00:00	2020-09-10 19:56:22.238322	\N
73	2333							Ceanothus trees around parking lot are too small to qualify for CalFire		2018-12-31 00:00:00	2020-09-10 19:56:22.23958	\N
74	2334							Ceanothus trees around parking lot are too small to qualify for CalFire		2018-12-31 00:00:00	2020-09-10 19:56:22.243847	\N
75	1608							also got a shrub (see above) and 1 CF tree (see TFO tab).  These small trees were not eligible for CalFire.  2 tree-wells at driveway (for Prunus) were very hard/expensive to break out.		2018-12-31 00:00:00	2020-09-10 19:56:22.24561	\N
76	1609							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.247024	\N
77	1610							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.248194	\N
78	1611							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.249162	\N
79	1612							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.250187	\N
80	1613							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.251292	\N
81	2780							open soil in planting strip 5.5' wide		2018-12-31 00:00:00	2020-09-10 19:56:22.252537	\N
82	2779							open soil in planting strip 5.5' wide		2018-12-31 00:00:00	2020-09-10 19:56:22.25352	\N
83	2778							open soil in planting strip 5.5' wide		2018-12-31 00:00:00	2020-09-10 19:56:22.254391	\N
84	1858							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.255166	\N
85	2777							open soil in planting strip 5.5' wide		2018-12-31 00:00:00	2020-09-10 19:56:22.255983	\N
86	1859							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.256709	\N
87	1860							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.257474	\N
88	1798							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.258251	\N
89	1799							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.259029	\N
90	1861							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.259748	\N
91	1800							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.260742	\N
92	1862							see #1; delayed this planting because of flooding on original date (verify -- may have been one to left or right)		2018-12-31 00:00:00	2020-09-10 19:56:22.261656	\N
93	1863							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.26237	\N
94	1864							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.263233	\N
95	2748							"ARB says RTP 12/19/16; This single family house has a lush planting strip of 31 inches wide and maybe 30 feet long. Then we see a sidewalk of six feet width. Will be unofficial bc close to utilities. Notch to make 3', plant now then pistache later when i"		2018-12-31 00:00:00	2020-09-10 19:56:22.264236	\N
96	2167							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.265343	\N
97	2168							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.266291	\N
98	2169							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.267228	\N
99	1857							"corner lot: 3 on E 38th, 1 on Woodruff"		2018-12-31 00:00:00	2020-09-10 19:56:22.268374	\N
100	2094							emailed to DJF -hhc 4/18/2017. sprayed for usa 4/18/2017		2018-12-31 00:00:00	2020-09-10 19:56:22.269303	\N
101	2095							DJF's neighbor		2018-12-31 00:00:00	2020-09-10 19:56:22.270123	\N
102	1955							revisit in fall 2016 - tree for front yard		2018-12-31 00:00:00	2020-09-10 19:56:22.270893	\N
103	2128							small tree not covered by CalFire		2018-12-31 00:00:00	2020-09-10 19:56:22.271674	\N
104	2129							also planting in front & side yards using CalFire grant		2018-12-31 00:00:00	2020-09-10 19:56:22.272382	\N
105	1953							also asked for 2 Jacarandas for backyard		2018-12-31 00:00:00	2020-09-10 19:56:22.273055	\N
106	2323							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.273666	\N
107	2059							also got CalFire tree (Acer rubrum) - see TFO tab		2018-12-31 00:00:00	2020-09-10 19:56:22.27427	\N
108	2322							1 tree replaces existing Sapium sebiferum (removed by owner)		2018-12-31 00:00:00	2020-09-10 19:56:22.275111	\N
109	2422							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.27601	\N
110	2423							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.276965	\N
111	2421							"corner lot; 1 S on Nicol, 2 L in open side yard (Pleitner Ave)"		2018-12-31 00:00:00	2020-09-10 19:56:22.277677	\N
112	2607							"corner lot; 1 on Lincoln, 1 on Damuth"		2018-12-31 00:00:00	2020-09-10 19:56:22.278597	\N
113	2608							"corner lot; 1 on Lincoln, 1 on Damuth"		2018-12-31 00:00:00	2020-09-10 19:56:22.279681	\N
114	1917									2018-12-31 00:00:00	2020-09-10 19:56:22.282219	\N
115	2449							above 580		2018-12-31 00:00:00	2020-09-10 19:56:22.28385	\N
116	1914							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.285285	\N
117	2326							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.28664	\N
118	2325									2018-12-31 00:00:00	2020-09-10 19:56:22.287913	\N
119	1913							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.289312	\N
120	2730							above 580		2018-12-31 00:00:00	2020-09-10 19:56:22.290634	\N
121	1912							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.291711	\N
122	1910									2018-12-31 00:00:00	2020-09-10 19:56:22.292661	\N
123	1911							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.293642	\N
124	2528							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.294789	\N
125	2527							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.295832	\N
126	2518							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.296873	\N
127	2526							"corner lot; 3 S on Maple, 4 M on Berlin"		2018-12-31 00:00:00	2020-09-10 19:56:22.297683	\N
128	2519							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.29837	\N
129	2520							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.299497	\N
130	2521							see #1; dead as of summer 2017		2018-12-31 00:00:00	2020-09-10 19:56:22.300554	\N
131	2517							parks car over curb; be careful about collisions w tree		2018-12-31 00:00:00	2020-09-10 19:56:22.301361	\N
132	2506							"corner lot; 1 on Laurel, 5 on Suter"		2018-12-31 00:00:00	2020-09-10 19:56:22.30213	\N
133	2507							"corner lot; 1 on Laurel, 5 on Suter"		2018-12-31 00:00:00	2020-09-10 19:56:22.302927	\N
134	2508							"corner lot; 1 on Laurel, 5 on Suter"		2018-12-31 00:00:00	2020-09-10 19:56:22.303761	\N
135	2509							"corner lot; 1 on Laurel, 5 on Suter"		2018-12-31 00:00:00	2020-09-10 19:56:22.304628	\N
136	2510							"corner lot; 1 on Laurel, 5 on Suter"		2018-12-31 00:00:00	2020-09-10 19:56:22.305417	\N
137	2420							"corner lot; 1 on Laurel, 5 on Suter"		2018-12-31 00:00:00	2020-09-10 19:56:22.3061	\N
138	2603							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.30679	\N
139	2604							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.307488	\N
140	2605							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.308279	\N
143	2726							"above 580; corner lot: 4 on Laurel, 2 on Georgia"		2018-12-31 00:00:00	2020-09-10 19:56:22.310422	\N
144	2727							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.311177	\N
145	2443									2018-12-31 00:00:00	2020-09-10 19:56:22.311876	\N
146	2602							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.312561	\N
147	2594									2018-12-31 00:00:00	2020-09-10 19:56:22.31326	\N
148	2596							email address failed 2/15/16		2018-12-31 00:00:00	2020-09-10 19:56:22.313943	\N
149	2601							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.314608	\N
150	2600							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.315276	\N
151	2597									2018-12-31 00:00:00	2020-09-10 19:56:22.316129	\N
152	2599							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.316793	\N
153	2598							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.31748	\N
154	2444									2018-12-31 00:00:00	2020-09-10 19:56:22.318232	\N
155	2725							above 580		2018-12-31 00:00:00	2020-09-10 19:56:22.318922	\N
156	2768									2018-12-31 00:00:00	2020-09-10 19:56:22.319664	\N
157	2769									2018-12-31 00:00:00	2020-09-10 19:56:22.32036	\N
158	2770									2018-12-31 00:00:00	2020-09-10 19:56:22.321074	\N
159	1856									2018-12-31 00:00:00	2020-09-10 19:56:22.321752	\N
160	2515									2018-12-31 00:00:00	2020-09-10 19:56:22.322438	\N
161	2419							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.323245	\N
162	2678							above 580; need stumps removed		2018-12-31 00:00:00	2020-09-10 19:56:22.324759	\N
163	2679							above 580; need stumps removed		2018-12-31 00:00:00	2020-09-10 19:56:22.325852	\N
164	2680							above 580; need stumps removed		2018-12-31 00:00:00	2020-09-10 19:56:22.327051	\N
165	319							REMOVED BY OWNERS		2018-12-31 00:00:00	2020-09-10 19:56:22.328274	\N
166	1844							also got 1 CF tree in yard (see TFO tab)		2018-12-31 00:00:00	2020-09-10 19:56:22.329921	\N
167	2209							"ARB's notes: 9/08/16: ""files TRF.""  9/18/16: ""ARB on site - crepe myrtle (hybrid) purple. Has a straggly hornbeam in slot in bricked-in planting strip (24""). He will remove tree, call City of Oakland to remove stump and call us to plant tree. May buy his"		2018-12-31 00:00:00	2020-09-10 19:56:22.331231	\N
168	2113							corner lot		2018-12-31 00:00:00	2020-09-10 19:56:22.332213	\N
169	2114							corner lot		2018-12-31 00:00:00	2020-09-10 19:56:22.333018	\N
170	2115							corner lot		2018-12-31 00:00:00	2020-09-10 19:56:22.333823	\N
171	2116							corner lot		2018-12-31 00:00:00	2020-09-10 19:56:22.334707	\N
172	2426							Nyssa sylvatica as front lawn tree: discussed but declined		2018-12-31 00:00:00	2020-09-10 19:56:22.335517	\N
173	1846							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.336422	\N
174	1845							corner lot; also paid for concrete removal in backyard		2018-12-31 00:00:00	2020-09-10 19:56:22.337272	\N
175	1847							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.338156	\N
176	2250									2018-12-31 00:00:00	2020-09-10 19:56:22.339267	\N
177	2232									2018-12-31 00:00:00	2020-09-10 19:56:22.340249	\N
178	2570							"corner lot; 3 on Brann, 1 on Seminary"		2018-12-31 00:00:00	2020-09-10 19:56:22.341452	\N
179	2569							"corner lot; 3 on Brann, 1 on Seminary"		2018-12-31 00:00:00	2020-09-10 19:56:22.342642	\N
180	2568							"corner lot; 3 on Brann, 1 on Seminary"		2018-12-31 00:00:00	2020-09-10 19:56:22.343777	\N
181	2567							"corner lot; 3 on Brann, 1 on Seminary"		2018-12-31 00:00:00	2020-09-10 19:56:22.344685	\N
182	2566							"corner lot; 3 on Brann, 2 on Seminary"		2018-12-31 00:00:00	2020-09-10 19:56:22.345424	\N
183	2565							"corner lot; 3 on Brann, 2 on Seminary"		2018-12-31 00:00:00	2020-09-10 19:56:22.346207	\N
184	2564							"corner lot; 3 on Brann, 2 on Seminary"		2018-12-31 00:00:00	2020-09-10 19:56:22.347251	\N
185	2563							"corner lot; 3 on Brann, 2 on Seminary"		2018-12-31 00:00:00	2020-09-10 19:56:22.348161	\N
186	2562							"corner lot; 3 on Brann, 2 on Seminary"		2018-12-31 00:00:00	2020-09-10 19:56:22.349063	\N
187	2512							also transplant existing maple 20' west		2018-12-31 00:00:00	2020-09-10 19:56:22.349988	\N
188	2450							replacement		2018-12-31 00:00:00	2020-09-10 19:56:22.350896	\N
189	2731							replacement		2018-12-31 00:00:00	2020-09-10 19:56:22.35184	\N
190	2425							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.352899	\N
191	2424							"one official tree, one unofficial tree"		2018-12-31 00:00:00	2020-09-10 19:56:22.35366	\N
192	2060									2018-12-31 00:00:00	2020-09-10 19:56:22.354312	\N
193	2096									2018-12-31 00:00:00	2020-09-10 19:56:22.354943	\N
194	2302									2018-12-31 00:00:00	2020-09-10 19:56:22.355624	\N
195	2131							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.356505	\N
196	2130									2018-12-31 00:00:00	2020-09-10 19:56:22.357127	\N
197	2462							"left front, behind the sidewalk. Wide-open space, no concrete present. Per ARB notes"		2018-12-31 00:00:00	2020-09-10 19:56:22.357727	\N
198	2210									2018-12-31 00:00:00	2020-09-10 19:56:22.358337	\N
199	1517									2018-12-31 00:00:00	2020-09-10 19:56:22.359058	\N
200	2612							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.359716	\N
201	2609							above 580		2018-12-31 00:00:00	2020-09-10 19:56:22.360445	\N
202	2212									2018-12-31 00:00:00	2020-09-10 19:56:22.361125	\N
203	2211									2018-12-31 00:00:00	2020-09-10 19:56:22.361835	\N
204	1814									2018-12-31 00:00:00	2020-09-10 19:56:22.362523	\N
205	1815							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.363228	\N
206	1816							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.36394	\N
207	2610							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.364679	\N
208	2463									2018-12-31 00:00:00	2020-09-10 19:56:22.365513	\N
209	2445									2018-12-31 00:00:00	2020-09-10 19:56:22.3663	\N
210	2754									2018-12-31 00:00:00	2020-09-10 19:56:22.367076	\N
211	2720									2018-12-31 00:00:00	2020-09-10 19:56:22.367817	\N
212	2408									2018-12-31 00:00:00	2020-09-10 19:56:22.36852	\N
213	2407									2018-12-31 00:00:00	2020-09-10 19:56:22.369273	\N
214	2753									2018-12-31 00:00:00	2020-09-10 19:56:22.370168	\N
215	2406									2018-12-31 00:00:00	2020-09-10 19:56:22.370943	\N
216	2405									2018-12-31 00:00:00	2020-09-10 19:56:22.371741	\N
217	2477									2018-12-31 00:00:00	2020-09-10 19:56:22.372594	\N
218	2476									2018-12-31 00:00:00	2020-09-10 19:56:22.373416	\N
219	2008									2018-12-31 00:00:00	2020-09-10 19:56:22.374204	\N
220	2007									2018-12-31 00:00:00	2020-09-10 19:56:22.37497	\N
221	2174									2018-12-31 00:00:00	2020-09-10 19:56:22.375682	\N
222	2433									2018-12-31 00:00:00	2020-09-10 19:56:22.376446	\N
223	2434									2018-12-31 00:00:00	2020-09-10 19:56:22.377192	\N
224	2300									2018-12-31 00:00:00	2020-09-10 19:56:22.377929	\N
225	2301									2018-12-31 00:00:00	2020-09-10 19:56:22.378754	\N
226	2006									2018-12-31 00:00:00	2020-09-10 19:56:22.379582	\N
227	2389									2018-12-31 00:00:00	2020-09-10 19:56:22.38045	\N
228	2295									2018-12-31 00:00:00	2020-09-10 19:56:22.381273	\N
229	1820							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.38203	\N
230	1819							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.382877	\N
231	1817							"existing tree-well with grate 4'x4', too small for CalFire"		2018-12-31 00:00:00	2020-09-10 19:56:22.383655	\N
232	1818							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.384452	\N
233	2173									2018-12-31 00:00:00	2020-09-10 19:56:22.385216	\N
234	2531									2018-12-31 00:00:00	2020-09-10 19:56:22.386263	\N
235	2532							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.387297	\N
236	2533							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.388153	\N
237	2534							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.389069	\N
238	2751							"two layers of sidewalk to remove: sawcut upper, jackhammer lower"		2018-12-31 00:00:00	2020-09-10 19:56:22.390007	\N
239	2750							"two layers of sidewalk to remove: sawcut upper, jackhammer lower"		2018-12-31 00:00:00	2020-09-10 19:56:22.390865	\N
240	2203									2018-12-31 00:00:00	2020-09-10 19:56:22.391721	\N
241	2522									2018-12-31 00:00:00	2020-09-10 19:56:22.392559	\N
242	2611							see #1		2018-12-31 00:00:00	2020-09-10 19:56:22.393323	\N
243	362	yes	no	no	yes	no	no	Lashed too		2019-01-03 11:00:00	2020-09-10 19:56:22.394165	\N
244	155	yes	yes	no	yes	yes	yes			2019-01-05 11:00:00	2020-09-10 19:56:22.39501	\N
245	156	yes	yes	no	yes	yes	yes			2019-01-05 11:00:00	2020-09-10 19:56:22.395766	\N
246	141	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.396757	\N
247	142	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.397476	\N
835	11								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.932666	\N
248	144	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.398159	\N
249	153	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.399208	\N
250	143	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.400178	\N
251	145	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.40105	\N
252	154	no	no	no	no	no	yes			2019-01-05 11:00:00	2020-09-10 19:56:22.401939	\N
253	152	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.402812	\N
254	146	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.403657	\N
255	147	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.404571	\N
256	148	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.405481	\N
257	151	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.406406	\N
258	149	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.40741	\N
259	150	yes	yes	no	yes	no	yes	pruned		2019-01-05 11:00:00	2020-09-10 19:56:22.408426	\N
260	287	yes	no	yes	no	no	yes	 Removed brace and stakes	WB	2019-01-08 11:00:00	2020-09-10 19:56:22.409515	\N
261	318	yes	yes	no	no	no	yes	"weeds and trash, Needs bigger clippers, needs more mulch"	WB	2019-01-08 11:00:00	2020-09-10 19:56:22.410461	\N
262	400	yes	yes	yes	no	no	yes	"plastic tied to tree, needs more mulch"	WB	2019-01-08 11:00:00	2020-09-10 19:56:22.411241	\N
263	510	yes	yes	yes	yes	no	yes	"wood tied to tree, needs more mulch"	WB	2019-01-08 11:00:00	2020-09-10 19:56:22.41205	\N
264	308	yes	yes	yes	yes	yes	no	"weeds, needs more mulch"	WB	2019-01-08 11:00:00	2020-09-10 19:56:22.412839	\N
265	309	yes	yes	yes	yes	yes	no	"weeds, needs more mulch"	WB	2019-01-08 11:00:00	2020-09-10 19:56:22.413629	\N
266	310	yes	yes	yes	yes	yes	yes	needs more mulch	WB	2019-01-08 11:00:00	2020-09-10 19:56:22.414405	\N
267	702	yes	no	yes	yes	yes	yes		WB	2019-01-08 11:00:00	2020-09-10 19:56:22.415146	\N
268	499	yes	yes	yes	no	no	yes		WB	2019-01-09 11:00:00	2020-09-10 19:56:22.415944	\N
269	359	yes	yes	yes	yes	yes	yes	"Might be time to take off the planting stake, yes (w p-stake)"	WB	2019-01-09 11:00:00	2020-09-10 19:56:22.416736	\N
270	536	yes	yes	yes	no	no	yes		WB	2019-01-09 11:00:00	2020-09-10 19:56:22.417474	\N
271	307	yes	No	yes	yes	yes	yes		WB	2019-01-09 11:00:00	2020-09-10 19:56:22.418275	\N
272	528	yes	No	yes	yes	yes	yes	rocks	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.419033	\N
273	330	yes	yes	yes	yes	yes	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.419845	\N
274	589	yes	yes	yes	yes	yes	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.420613	\N
275	508	yes	yes	yes	yes	yes	yes	3 wood stakes	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.421356	\N
276	679	yes	yes	yes	yes	yes	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.42209	\N
277	513	yes	yes	yes	yes	yes	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.422854	\N
278	615	yes	yes	yes	yes	yes	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.423784	\N
279	133	yes	yes	yes	no	no	yes	"This is all tangled up in its brace and the leader loyess way off, Remove Stakes and braces?"	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.424642	\N
280	132	yes	yes	yes	no	no	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.425387	\N
281	134	yes	yes	yes	yes	yes	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.426119	\N
282	135	yes	yes	yes	yes	yes	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.426925	\N
283	331	yes	yes	yes	no	no	yes	 Removed brace and stakes	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.427667	\N
284	235	yes	yes	yes	no	no	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.428636	\N
285	340	yes	yes	yes	yes	yes	yes	Health and form should be examined	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.429606	\N
286	339	yes	yes	yes	yes	yes	yes	Health and form should be examined	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.430886	\N
287	657	yes	yes	yes	yes	yes	yes	'regular homeless vandals'...	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.431941	\N
288	658	yes	yes	yes	No	no	yes	regular homeless vandals’... removed stakes	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.432999	\N
289	659	yes	yes	yes	yes	yes	yes	'regular homeless vandals'...	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.434058	\N
290	298	yes	yes	yes	no	no	yes	" Removed brace and stakes, plantings"	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.434953	\N
291	534	yes	no	yes	yes	yes	no	plantings	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.43579	\N
292	527	yes	yes	yes	no	no	yard		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.436729	\N
293	526	yes	yes	yes	yes	yes	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.437628	\N
294	234	yes	yes	yes	no	no	yes	 Removed brace and stakes	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.438735	\N
295	405	yes	No	yes	yes	yes	No	There is a sinkhole in the planting strip no amount of mulch will fix	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.439756	\N
296	456	yes	no	yes	yes	yes	No		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.440733	\N
297	341	yes	yes	yes	yes	no	no	"wooden planting stake, yard"	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.441704	\N
298	453	yes	yes	yes	no	no	yes	"removed stakes, braces"	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.442662	\N
299	454	yes	yes	yes	yes	yes	yes	Stake could be removed w/ in 6 months	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.44365	\N
300	416	yes	No	No	yes	yes	No	"No green in the tips, fragile branches, has weeds"	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.444589	\N
301	455	yes	yes	yes	yes	yes	yes	Stake could be removed w/ in 6 months	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.445378	\N
302	394	yes	yes	yes	yes	yes	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.446309	\N
303	698	yes	yes	yes	yes	yes	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.447216	\N
304	335	yes	yes	yes	no	no	no	Seems small for age yard	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.448202	\N
305	342	yes	yes	yes	yes	yes	yes		WB	2019-01-18 11:00:00	2020-09-10 19:56:22.449273	\N
306	350	yes	yes	yes	no	no	No	yard	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.450515	\N
307	348	yes	yes	yes	no	no	No	no stakes (wood planting) yard	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.451573	\N
308	347	yes	no	yes	yes	yes	No	plantings	WB	2019-01-18 11:00:00	2020-09-10 19:56:22.452332	\N
309	645	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.45325	\N
310	140	yes	no	yes	no	no	no	yard	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.45426	\N
311	707	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.455247	\N
312	571	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.45633	\N
313	572	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.45724	\N
314	538	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.458032	\N
315	539	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.4588	\N
316	540	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.459577	\N
317	537	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.460374	\N
318	541	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.461066	\N
319	543	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.461768	\N
320	542	yes	yes	yes	yes	yes	yes	Trauma to trunk	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.46252	\N
321	545	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.463235	\N
322	546	yes	yes	yes	yes	yes	yes	Trauma to trunk and leader a little off	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.46397	\N
323	544	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.464836	\N
324	547	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.465621	\N
325	548	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.466516	\N
326	549	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.467363	\N
327	466	yes	no	no	no	no	yes	"Owner should be notified re: weeds at base, yard/weeds"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.468157	\N
328	36	yes	no	no	yes	yes	no	"Health? 3 Stake, 3 brace, fix stake"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.468867	\N
329	33	yes	no	no	yes	yes	no	"Health? 3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.469697	\N
330	31	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.470727	\N
836	32								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.934181	\N
331	3	yes	yes	yes	yes	yes	yes	Trauma to trunk	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.47164	\N
332	30	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.472458	\N
333	29	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.473289	\N
334	4	yes	yes	yes	yes	yes	yes	Trauma to trunk	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.474053	\N
335	28	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.475026	\N
336	27	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.47586	\N
337	39	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.476612	\N
338	5	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.477417	\N
339	38	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.478279	\N
340	35	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.479337	\N
341	6	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.480353	\N
342	37	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.481417	\N
343	26	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.482324	\N
344	7	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.483605	\N
345	25	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.484902	\N
346	34	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.485885	\N
347	24	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.486719	\N
348	8	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.48749	\N
349	23	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.488282	\N
350	9	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.489092	\N
351	32	yes	yes	yes	yes	yes	yes	"3 Stake, 3 brace"	WB	2019-01-21 11:00:00	2020-09-10 19:56:22.489894	\N
352	10	yes	yes	yes	yes	yes	yes		WB	2019-01-21 11:00:00	2020-09-10 19:56:22.490956	\N
353	201	No	No	No	no	no	No	DEAD 2018	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.492194	\N
354	204	yes	yes	No	No	No	yes	"Water bag, two different sets of stakes"	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.49313	\N
355	202	No	No	No	no	no	No	Dead 2019	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.493859	\N
356	203	No	No	No	no	no	No	Dead 2019	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.494852	\N
357	212	yes	yes	yes	no	no	yes	DEAD 2018	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.495621	\N
358	128	yes	yes	yes	no	no	yes		WB	2019-01-24 11:00:00	2020-09-10 19:56:22.496295	\N
359	247	yes	No	yes	Yes	Yes	yes	wounds from nursery stake	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.497015	\N
360	213	yes	yes	No	yes	yes	no	"DEAD 2018, trash"	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.497664	\N
361	246	yes	yes	yes	Yes	Yes	yes		WB	2019-01-24 11:00:00	2020-09-10 19:56:22.49928	\N
362	245	yes	yes	yes	Yes	Yes	yes		WB	2019-01-24 11:00:00	2020-09-10 19:56:22.500075	\N
363	244	yes	yes	yes	no	no	yes	"wounds from nursery stake, Removed stakes and braces"	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.500742	\N
364	261	yes	yes	yes	no	no	no	plantings	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.501383	\N
365	243	yes	yes	yes	Yes	Yes	yes		WB	2019-01-24 11:00:00	2020-09-10 19:56:22.502192	\N
366	262	yes	yes	yes	no	no	no	plantings	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.50318	\N
367	263	yes	yes	yes	no	no	no	plantings	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.504092	\N
368	264	yes	yes	yes	no	no	no	plantings	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.504946	\N
369	242	yes	no	yes	Yes	Yes	no	"some yellow margins on leaves, weeds, needs mulch"	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.505729	\N
370	206	yes	no	yes	yes	yes	no	"Misc. wooden stakes in well, water bag, still very young loyesing for 2+ yers in ground, weeds, needs mulch"	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.506661	\N
371	636	yes	yes	yes	yes	yes	no	plantings	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.507508	\N
372	214	yes	no	yes	yes	yes	no	"weeds, needs mulch"	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.508597	\N
373	241	yes	Yes	yes	Yes	Yes	Yes	some yellow margins on leaves	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.509696	\N
374	240	yes	Yes	yes	Yes	Yes	Yes	"minor bark damage, add trunk guard? missing 1 plywood brace"	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.510636	\N
375	239	yes	Yes	yes	Yes	Yes	Yes	"missing 1 plywood brace, 3"" wood, 1 bryesen"	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.51156	\N
376	238	yes	Yes	yes	Yes	Yes	Yes		WB	2019-01-24 11:00:00	2020-09-10 19:56:22.512646	\N
377	237	yes	Yes	yes	Yes	Yes	Yes		WB	2019-01-24 11:00:00	2020-09-10 19:56:22.513661	\N
378	236	yes	No	yes	Yes	Yes	No	"bark damage, add trunk guard, weeds/trash, needs mulch"	WB	2019-01-24 11:00:00	2020-09-10 19:56:22.514591	\N
379	649	yes	yes	yes	yes	yes	yes		WB	2019-01-28 11:00:00	2020-09-10 19:56:22.515567	\N
380	648	yes	yes	yes	yes	yes	yes	"Trunk damage, leader leaning awkward"	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.517031	\N
381	366	yes	yes	yes	yes	yes	yes	"Appears to have been headed, rando wooden stake"	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.517916	\N
382	367	yes	yes	yes	no	no	yes	Appears to have been headed	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.518762	\N
383	368	yes	yes	yes	yes	yes	yes	"Appears to have been headed, yes, planting stake"	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.51988	\N
384	369	yes	yes	yes	yes	yes	yes	Appears to have been headed	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.520861	\N
385	370	yes	yes	yes	yes	yes	yes	 Removed brace and stakes	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.521703	\N
386	371	yes	yes	yes	yes	yes	yes	"Appears to have been headed,  Removed brace and stakes"	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.52261	\N
387	372	yes	yes	yes	No	No	yes	 Removed brace and stakes	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.523527	\N
388	373	yes	yes	yes	yes	yes	yes	"Appears to have been headed,  Removed brace and stakes"	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.524402	\N
389	374	yes	yes	yes	yes	yes	yes	Remove stake soon	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.52513	\N
390	375	yes	yes	yes	yes	yes	yes	"Appears to have been headed,  Removed brace and stakes"	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.525942	\N
391	376	yes	yes	yes	yes	yes	yes	Remove stake soon	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.526703	\N
392	251	yes	yes	yes	yes	yes	yes		WB	2019-01-28 11:00:00	2020-09-10 19:56:22.527404	\N
393	252	yes	yes	yes	yes	yes	yes	significant trunk damage	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.528295	\N
394	253	yes	yes	yes	yes	yes	yes		WB	2019-01-28 11:00:00	2020-09-10 19:56:22.529268	\N
395	265	yes	yes	yes	yes	no	yes	Braces missing bolts	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.530155	\N
396	254	yes	yes	yes	yes	yes	yes		WB	2019-01-28 11:00:00	2020-09-10 19:56:22.530975	\N
397	255	yes	yes	yes	yes	yes	yes	significant trunk damage	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.531966	\N
398	256	yes	yes	yes	yes	yes	yes		WB	2019-01-28 11:00:00	2020-09-10 19:56:22.533266	\N
399	257	yes	yes	yes	yes	yes	yes	significant trunk damage	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.534329	\N
400	258	yes	yes	yes	yes	yes	yes	significant trunk damage	WB	2019-01-28 11:00:00	2020-09-10 19:56:22.535355	\N
401	247	no	Yes	No	no	no	no	wounds from nursery stake	WB	2019-02-08 11:00:00	2020-09-10 19:56:22.536509	\N
402	514	yes	no	yes	Yes	no	No	"Front yard, loyess taken care of, owner might want mulch, planting stake"	WB	2019-02-21 11:00:00	2020-09-10 19:56:22.537726	\N
403	617	yes	yes	yes	yes	yes	yes		WB	2019-02-22 11:00:00	2020-09-10 19:56:22.539185	\N
404	470	yes	no	yes	Yes	no	No	"May want some mulch, planting stake"	WB	2019-02-22 11:00:00	2020-09-10 19:56:22.540762	\N
405	469	yes	yes	yes	yes	yes	yes	Chickenwire cages by owners	WB	2019-02-22 11:00:00	2020-09-10 19:56:22.542224	\N
406	468	yes	yes	yes	yes	yes	yes	Chickenwire cages by owners	WB	2019-02-22 11:00:00	2020-09-10 19:56:22.543404	\N
407	494	yes	no	yes	yes	yes	no	"Its a bramble, unsure how to proceed on OP&R property, Major pruning"	WB	2019-02-22 11:00:00	2020-09-10 19:56:22.544497	\N
657	179	yes	yes	yes	yes	no	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.757718	\N
408	495	yes	no	yes	no	no	no	"Its a bramble, unsure how to proceed on OP&R property, Major pruning"	WB	2019-02-22 11:00:00	2020-09-10 19:56:22.54548	\N
409	457	yes	no	yes	No	no	no	"May want some mulch, planting stake"	WB	2019-02-22 11:00:00	2020-09-10 19:56:22.546549	\N
410	496	yes	no	yes	yes	yes	no	"Its a bramble, unsure how to proceed on OP&R property, Major pruning, needs mulch"	WB	2019-02-22 11:00:00	2020-09-10 19:56:22.547271	\N
411	516	yes	no	yes	yes	yes	yes	 Needs mulch	WB	2019-02-22 11:00:00	2020-09-10 19:56:22.547933	\N
412	490	yes	bag	yes	yes	yes	bag		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.548597	\N
413	489	yes	bag	yes	yes	yes	bag		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.549283	\N
414	488	yes	bag	yes	yes	yes	bag		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.550038	\N
415	487	yes	bag	yes	yes	yes	bag	Topped at some point	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.550806	\N
416	486	yes	bag	yes	yes	yes	bag		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.551452	\N
417	485	yes	bag	yes	yes	yes	bag		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.552158	\N
418	484	yes	bag	yes	yes	yes	bag		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.552987	\N
419	483	yes	bag	yes	yes	yes	bag		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.553648	\N
420	482	yes	bag	yes	fair	yes	bag		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.554531	\N
421	481	yes	bag	yes	yes	yes	bag		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.555233	\N
422	480	yes	yes	yes	yes	yes	yes		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.55597	\N
423	479	yes	yes	yes	yes	yes	yes		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.55665	\N
424	478	yes	yes	yes	yes	yes	yes		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.557297	\N
425	477	yes	yes	yes	yes	yes	yes		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.558038	\N
426	476	yes	yes	yes	yes	yes	yes		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.55879	\N
427	475	yes	yes	yes	yes	yes	yes		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.559548	\N
428	15	yes	yes	yes	yes	yes	yes	bag mulch	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.560221	\N
429	16	yes	yes	yes	yes	yes	yes	bag mulch	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.560888	\N
430	17	yes	yes	yes	yes	yes	yes	bag mulch	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.561503	\N
431	21	yes	yes	yes	yes	yes	yes	bag mulch	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.562148	\N
432	12	yes	yes	yes	yes	yes	yes	Black Mulch	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.562882	\N
433	18	yes	yes	yes	yes	yes	yes	bag mulch	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.563552	\N
434	13	yes	yes	yes	yes	yes	yes	Black Mulch	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.564265	\N
435	19	yes	yes	yes	yes	yes	yes	bag mulch	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.564934	\N
436	14	yes	yes	yes	yes	yes	yes	Black Mulch	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.565641	\N
437	20	yes	yes	yes	yes	yes	yes	bag mulch	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.566377	\N
438	11	yes	yes	yes	no	no	yes	Black Mulch	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.567177	\N
439	98	yes	yes	yes	yes	yes	yes	"pruned 6/08/18, bag mulch"	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.567978	\N
440	97	yes	yes	yes	yes	yes	yes	"pruned 6/08/18, bag mulch"	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.568811	\N
441	96	yes	yes	yes	yes	yes	yes	"pruned 6/08/18, bag mulch"	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.569597	\N
442	94	yes	yes	yes	yes	yes	yes	"Stake can be removed soon, pruned 6/08/18"	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.570414	\N
443	93	yes	yes	yes	yes	yes	yes		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.571253	\N
444	92	yes	yes	yes	yes	yes	yes	"Stake can be removed soon, pruned 6/08/18"	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.572119	\N
445	91	yes	yes	yes	yes	yes	yes		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.572878	\N
446	90	yes	yes	yes	no	no	yes		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.573541	\N
447	89	yes	yes	yes	no	no	yes		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.574326	\N
448	88	yes	yes	yes	no	no	yes		WB	2019-03-04 11:00:00	2020-09-10 19:56:22.575305	\N
449	87	yes	yes	yes	yes	yes	yes	"Stake can be removed soon, pruned 6/08/18,"	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.576081	\N
450	86	yes	yes	yes	yes	yes	yes	"Stake can be removed soon, pruned 6/08/18,"	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.576869	\N
451	85	yes	yes	yes	yes	yes	yes	"Construction on building, tree staked to protect, pruned 6/08/18,"	WB	2019-03-04 11:00:00	2020-09-10 19:56:22.577648	\N
452	230	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.578479	\N
453	529	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.579299	\N
454	398	yes	No	yes	yes	yes	No		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.580154	\N
455	313	yes	yes	yes	yes	yes	yes	 Removed brace and stakes	WB	2019-03-08 11:00:00	2020-09-10 19:56:22.580938	\N
456	314	yes	yes	yes	yes	yes	yes	May be time to removed stake soon	WB	2019-03-08 11:00:00	2020-09-10 19:56:22.58166	\N
457	637	yes	No	No	yes	yes	No	Possibly Dead?	WB	2019-03-08 11:00:00	2020-09-10 19:56:22.582476	\N
458	425	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.583401	\N
459	426	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.584375	\N
460	427	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.585263	\N
461	533	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.586044	\N
462	532	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.586932	\N
463	306	yes	No	No	yes	yes	No	May want to talk to owner about stake removal.	WB	2019-03-08 11:00:00	2020-09-10 19:56:22.587758	\N
464	353	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.588524	\N
465	574	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.589337	\N
466	380	yes	No	yes	yes	yes	No		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.590191	\N
467	378	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.590997	\N
468	379	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.591779	\N
469	531	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.592533	\N
470	397	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.593299	\N
471	396	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.59396	\N
472	635	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.59462	\N
473	530	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.59541	\N
474	634	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.596266	\N
475	633	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.597215	\N
476	2768	yes	yes	yes	yes	yes	yes	Health of the tree is questionable. Not dead yet	WB	2019-03-08 11:00:00	2020-09-10 19:56:22.598137	\N
477	320	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.599098	\N
478	660	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.600145	\N
479	226	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.601097	\N
480	227	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.602542	\N
481	573	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.603537	\N
482	588	yes	no	yes	yes	no	no	"planting stake, lawn"	WB	2019-03-08 11:00:00	2020-09-10 19:56:22.604534	\N
483	343	yes	no	yes	yes	yes	no	"Wooden 3 post stakes, remove?, lawn"	WB	2019-03-08 11:00:00	2020-09-10 19:56:22.605552	\N
484	282	yes	no	yes	No	Yes	no	"Talk to owner about stake removal, string brace, lawn"	WB	2019-03-08 11:00:00	2020-09-10 19:56:22.606394	\N
485	344	yes	no	yes	yes	yes	no	"Wooden 3 post stakes, remove? , lawn"	WB	2019-03-08 11:00:00	2020-09-10 19:56:22.607108	\N
486	576	yes	yes	yes	yes	yes	yes		WB	2019-03-08 11:00:00	2020-09-10 19:56:22.607863	\N
487	307	yes	yes	yes	yes	yes	yes		WB	2019-03-15 11:00:00	2020-09-10 19:56:22.60871	\N
488	710	yes	yes	yes	yes	yes	yes		WB	2019-03-15 11:00:00	2020-09-10 19:56:22.609454	\N
489	709	yes	yes	yes	yes	yes	yes		WB	2019-03-15 11:00:00	2020-09-10 19:56:22.610194	\N
490	708	yes	yes	yes	yes	yes	yes		WB	2019-03-15 11:00:00	2020-09-10 19:56:22.610889	\N
491	2	yes	yes	yes	yes	yes	yes	 Removed brace and stakes	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.611596	\N
492	1	yes	yes	yes	yes	yes	yes	 Removed brace and stakes	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.612318	\N
493	458	yes	yes	yes	yes	yes	yes		WB	2019-03-15 11:00:00	2020-09-10 19:56:22.613066	\N
494	467	yes	yes	yes	yes	yes	yes	 Removed brace and stakes	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.613744	\N
495	616	yes	yes	yes	No	no	yes	Could be loyesed after better.	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.614607	\N
496	628	yes	yes	yes	yes	yes	yes		WB	2019-03-15 11:00:00	2020-09-10 19:56:22.615325	\N
497	205	yes	yes	yes	yes	yes	yes	Replaced 2019	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.61605	\N
498	127	yes	yes	yes	yes	yes	yes	"Crossbraces on with nails,  Removed brace and stakes"	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.616739	\N
499	126	yes	yes	yes	yes	yes	yes	"Crossbraces on with nails,  Removed brace and stakes"	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.617523	\N
500	266	yes	yes	yes	yes	yes	yes	 Removed brace and stakes	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.618401	\N
501	311	yes	yes	yes	yes	yes	yes		WB	2019-03-15 11:00:00	2020-09-10 19:56:22.61911	\N
502	299	yes	yes	yes	yes	yes	yes	 Removed brace and stakes	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.619865	\N
503	130	yes	yes	yes	yes	yes	yes	 Removed brace and stakes	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.620665	\N
504	329	yes	yes	yes	yes	yes	yes	"Strange situation with the leader, training?"	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.621359	\N
505	1489	yes	yes	yes	yes	yes	yes		WB	2019-03-15 11:00:00	2020-09-10 19:56:22.621999	\N
506	509	yes	yes	yes	yes	yes	yes	leader might need some guidance.	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.622792	\N
507	399	yes	yes	yes	yes	yes	yes		WB	2019-03-15 11:00:00	2020-09-10 19:56:22.623563	\N
508	337	yes	yes	yes	yes	yes	yes	 Removed brace and stakes	WB	2019-03-15 11:00:00	2020-09-10 19:56:22.6243	\N
509	629	yes	yes	yes	yes	yes	yes	Magnolia from earlier planting at this house too	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.624979	\N
510	\N	yes	yes	yes	yes	yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.625684	\N
511	273	yes	yes	yes	yes	yes	yes	 Removed brace and stakes	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.626432	\N
512	275	yes	yes	yes	yes	yes	yes	Stake can be removed soon	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.627261	\N
513	272	yes	yes	yes	yes	yes	yes	Stake can be removed soon	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.628112	\N
514	274	yes	yes	yes	yes	yes	yes	 Removed brace and stakes	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.629044	\N
515	271	yes	yes	yes	yes	yes	No	plantings	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.629892	\N
516	515	yes	yes	yes	Yes	Yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.630725	\N
517	208	yes	yes	yes	Yes	Yes	yes	Stake can be removed soon	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.631587	\N
518	207	yes	yes	yes	Yes	Yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.632414	\N
519	305	yes	yes	yes	yes	yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.633389	\N
520	650	yes	yes	yes	yes	yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.634561	\N
521	267	yes	yes	yes	Yes	Yes	yes	Stake can be removed soon	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.635707	\N
522	268	yes	yes	yes	Yes	Yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.637036	\N
523	269	yes	yes	yes	no	no	yes	 Removed brace and stakes	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.638342	\N
524	270	yes	yes	yes	Yes	Yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.639599	\N
525	471	yes	yes	yes	no	no	yes	 Removed brace and stakes	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.640547	\N
526	292	yes	yes	yes	no	no	yes	Water bag can probably be removed	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.641444	\N
527	703	yes	yes	yes	yes	yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.642587	\N
528	293	yes	yes	yes	no	no	yes	Water bag can probably be removed	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.643854	\N
529	294	yes	yes	yes	yes	yes	yes	Water bag can probably be removed	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.645035	\N
530	351	yes	yes	yes	Yes	Yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.646164	\N
531	352	yes	yes	yes	Yes	Yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.647232	\N
532	338	yes	yes	yes	yes	yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.648449	\N
533	667	yes	yes	yes	yes	yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.649649	\N
534	666	yes	yes	yes	yes	yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.650679	\N
535	668	yes	yes	yes	yes	yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.651599	\N
536	295	yes	yes	yes	no	no	yes	Water bag can probably be removed	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.652597	\N
537	296	yes	yes	yes	no	no	yes	Water bag can probably be removed	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.653581	\N
538	669	yes	yes	yes	yes	yes	yes		WB	2019-03-28 11:00:00	2020-09-10 19:56:22.654639	\N
539	472	yes	yes	yes	Yes	Yes	yes	Stake can be removed soon	WB	2019-03-28 11:00:00	2020-09-10 19:56:22.655664	\N
540	48	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.656593	\N
541	49	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.657522	\N
542	51	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.658502	\N
543	50	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.65954	\N
544	58	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.660483	\N
545	55	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.661374	\N
546	52	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.662268	\N
547	56	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.663152	\N
548	63	yes	yes	yes	yes	yes	yes	Fair due to age in comparison	WB	2019-03-29 11:00:00	2020-09-10 19:56:22.664048	\N
549	57	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.665079	\N
550	62	yes	yes	yes	yes	yes	yes	Metal colar on crown at trunk	WB	2019-03-29 11:00:00	2020-09-10 19:56:22.666061	\N
551	64	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.667201	\N
552	54	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.668084	\N
553	61	yes	yes	yes	yes	yes	yes	Metal colar on crown at trunk	WB	2019-03-29 11:00:00	2020-09-10 19:56:22.668849	\N
554	53	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.66972	\N
555	60	yes	yes	yes	yes	yes	yes	Metal colar on crown at trunk	WB	2019-03-29 11:00:00	2020-09-10 19:56:22.670603	\N
556	59	yes	yes	yes	yes	yes	yes	Leader is braced by strap	WB	2019-03-29 11:00:00	2020-09-10 19:56:22.671539	\N
557	47	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.672486	\N
558	46	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.673398	\N
559	44	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.674168	\N
560	45	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.674964	\N
561	43	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.675707	\N
562	42	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.676524	\N
563	41	yes	yes	yes	yes	yes	yes		WB	2019-03-29 11:00:00	2020-09-10 19:56:22.677261	\N
564	40	yes	yes	yes	yes	yes	yes	"Loyess distressed. Might be swamped, might be the weather."	WB	2019-03-29 11:00:00	2020-09-10 19:56:22.678159	\N
565	441	yes	yes	yes	yes	yes	yes	"Dead leader has been removed, probably needs additional trimming help"	WB	2019-04-25 11:00:00	2020-09-10 19:56:22.679363	\N
566	442	yes	yes	yes	yes	yes	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.680429	\N
567	443	yes	yes	yes	fair	yes	yes	One stake is bryesen but rig is standing fine	WB	2019-04-25 11:00:00	2020-09-10 19:56:22.681381	\N
568	444	yes	yes	yes	yes	yes	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.682382	\N
569	445	yes	yes	yes	yes	yes	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.683361	\N
570	446	yes	yes	yes	no	no	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.684322	\N
571	447	yes	yes	yes	no	no	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.685431	\N
572	440	yes	yes	yes	no	no	yes	"Trunk has large gash on bottom 1/3rd, needs loyesing at,  Removed brace and stakes"	WB	2019-04-25 11:00:00	2020-09-10 19:56:22.686373	\N
573	439	yes	yes	yes	no	no	yes	"Tree is dead, trunk removed,  Removed brace and stakes"	WB	2019-04-25 11:00:00	2020-09-10 19:56:22.687421	\N
574	432	yes	yes	yes	no	no	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.688382	\N
575	429	yes	yes	yes	yes	yes	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.689397	\N
576	431	yes	yes	yes	yes	yes	yes	Stakes ready to be removed?	WB	2019-04-25 11:00:00	2020-09-10 19:56:22.690578	\N
577	438	yes	yes	yes	yes	yes	yes	One stake is bryesen but rig is standing fine; Stakes ready to be removed?	WB	2019-04-25 11:00:00	2020-09-10 19:56:22.691565	\N
578	435	yes	yes	yes	yes	yes	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.692475	\N
579	437	yes	yes	yes	yes	yes	yes	Stakes ready to be removed?	WB	2019-04-25 11:00:00	2020-09-10 19:56:22.693499	\N
580	433	yes	yes	yes	yes	yes	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.69451	\N
581	436	yes	yes	yes	yes	yes	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.695542	\N
582	434	yes	yes	yes	yes	yes	yes	Stakes ready to be removed?	WB	2019-04-25 11:00:00	2020-09-10 19:56:22.696482	\N
583	430	yes	yes	yes	yes	yes	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.697275	\N
584	428	yes	yes	yes	yes	yes	yes		WB	2019-04-25 11:00:00	2020-09-10 19:56:22.698001	\N
585	297	yes	yes	Yes	no	no	yes	 Removed brace and stakes	WB	2019-04-30 11:00:00	2020-09-10 19:56:22.698681	\N
586	595	yes	yes	yes	yes	yes	yes		WB	2019-04-30 11:00:00	2020-09-10 19:56:22.699462	\N
587	493	yes	yes	yes	yes	yes	yes		WB	2019-04-30 11:00:00	2020-09-10 19:56:22.700214	\N
588	492	yes	yes	yes	yes	yes	yes	Loyess poor compared to others	WB	2019-04-30 11:00:00	2020-09-10 19:56:22.700953	\N
589	491	yes	yes	yes	yes	yes	yes		WB	2019-04-30 11:00:00	2020-09-10 19:56:22.701677	\N
590	70	yes	yes	yes	yes	yes	No	plantings	WB	2019-04-30 11:00:00	2020-09-10 19:56:22.702455	\N
591	22	yes	yes	yes	yes	yes	yes		WB	2019-04-30 11:00:00	2020-09-10 19:56:22.703252	\N
592	95	yes	yes	yes	yes	yes	yes	replaced 6/08/18	WB	2019-04-30 11:00:00	2020-09-10 19:56:22.704047	\N
593	607	yes	No	No	yes	yes	No	"Chickenwire around stakes, branches inside, needs mulch, weeds"	WB	2019-04-30 11:00:00	2020-09-10 19:56:22.704757	\N
594	608	yes	No	No	yes	yes	No	"Chickenwire around stakes, branches inside, needs mulch weeds"	WB	2019-04-30 11:00:00	2020-09-10 19:56:22.705551	\N
595	609	yes	No	No	yes	yes	No	"Chickenwire around stakes, branches, suckers inside, needs mulch, weeds"	WB	2019-04-30 11:00:00	2020-09-10 19:56:22.706324	\N
596	610	yes	No	No	yes	yes	No	"Chickenwire around stakes, suckers at base, needs mulch, weeds"	WB	2019-04-30 11:00:00	2020-09-10 19:56:22.707035	\N
597	611	yes	No	No	yes	yes	No	"Chickenwire around stakes, suckers at base, needs mulch, weeds"	WB	2019-04-30 11:00:00	2020-09-10 19:56:22.707798	\N
598	312	yes	yes	yes	No	yes	yes	Bamboo extension on wood brace needs attention	WB	2019-04-30 11:00:00	2020-09-10 19:56:22.708511	\N
599	99	yes	yes	yes	yes	yes	yes		WB	2019-06-20 11:00:00	2020-09-10 19:56:22.709276	\N
600	100	yes	yes	yes	No	No	yes	 Removed brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.709986	\N
601	101	yes	yes	yes	yes	yes	yes		WB	2019-06-20 11:00:00	2020-09-10 19:56:22.710698	\N
602	102	yes	yes	yes	yes	yes	yes		WB	2019-06-20 11:00:00	2020-09-10 19:56:22.71144	\N
603	103	yes	yes	yes	yes	yes	yes		WB	2019-06-20 11:00:00	2020-09-10 19:56:22.712171	\N
604	104	yes	yes	yes	yes	yes	yes		WB	2019-06-20 11:00:00	2020-09-10 19:56:22.71354	\N
605	105	yes	yes	yes	yes	yes	yes		WB	2019-06-20 11:00:00	2020-09-10 19:56:22.714332	\N
606	106	yes	yes	yes	yes	yes	yes		WB	2019-06-20 11:00:00	2020-09-10 19:56:22.716305	\N
607	107	yes	yes	yes	yes	yes	yes	Metal post as second planting stake removed	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.717258	\N
608	108	yes	yes	yes	yes	yes	yes		WB	2019-06-20 11:00:00	2020-09-10 19:56:22.718032	\N
609	109	yes	yes	yes	yes	yes	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.718793	\N
610	110	yes	yes	yes	yes	yes	yes		WB	2019-06-20 11:00:00	2020-09-10 19:56:22.719509	\N
611	111	yes	yes	yes	yes	yes	yes		WB	2019-06-20 11:00:00	2020-09-10 19:56:22.720173	\N
612	112	yes	yes	yes	no	no	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.720889	\N
613	125	yes	yes	yes	yes	No	yes	"Leader is leaning slightly, needs bolt set"	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.721604	\N
614	113	yes	yes	yes	no	no	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.722316	\N
615	124	yes	yes	yes	yes	yes	yes		WB	2019-06-20 11:00:00	2020-09-10 19:56:22.723075	\N
616	114	yes	yes	yes	no	no	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.723853	\N
617	123	yes	yes	yes	no	no	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.724568	\N
618	122	yes	yes	yes	no	no	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.725256	\N
619	115	yes	yes	yes	no	no	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.725933	\N
620	116	yes	yes	yes	no	no	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.72668	\N
621	117	yes	yes	yes	no	no	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.727518	\N
622	121	yes	yes	yes	no	no	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.728314	\N
623	118	yes	yes	yes	no	no	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.729268	\N
624	120	yes	yes	yes	no	no	yes	All trees in San Antiono Park are wrapped in chicken wire	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.730386	\N
625	119	yes	yes	yes	no	no	yes	 Remove brace and stakes	WB	2019-06-20 11:00:00	2020-09-10 19:56:22.731322	\N
626	557	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.732152	\N
627	556	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.733334	\N
628	555	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.734437	\N
629	554	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.735432	\N
630	564	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.736431	\N
631	553	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.737336	\N
632	563	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.738187	\N
633	552	yes	yes	yes	yes	yes	yes	top splinted 9/16/18	WB	2019-06-24 11:00:00	2020-09-10 19:56:22.739015	\N
634	562	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.739897	\N
635	551	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.740746	\N
636	561	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.741508	\N
637	550	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.742247	\N
638	560	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.743154	\N
639	559	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.743868	\N
640	567	yes	yes	yes	yes	yes	yes	edges burnt	WB	2019-06-24 11:00:00	2020-09-10 19:56:22.744614	\N
641	565	yes	yes	yes	yes	yes	yes	trees along madison have edges of leaves burnt	WB	2019-06-24 11:00:00	2020-09-10 19:56:22.745411	\N
642	568	yes	yes	yes	yes	yes	yes	"canopy empty of leaves, may have too much water 6/24 WB"	WB	2019-06-24 11:00:00	2020-09-10 19:56:22.746103	\N
643	558	yes	yes	yes	yes	yes	yes		WB	2019-06-24 11:00:00	2020-09-10 19:56:22.746898	\N
644	566	yes	yes	yes	yes	yes	yes	trees along madison have edges of leaves burnt	WB	2019-06-24 11:00:00	2020-09-10 19:56:22.747604	\N
645	569	yes	yes	yes	yes	yes	yes	trees along madison have edges of leaves burnt	WB	2019-06-24 11:00:00	2020-09-10 19:56:22.748308	\N
646	570	yes	yes	yes	yes	yes	yes	"heavy scar on trunk, needs weedwacker guard 6/24 WB"	WB	2019-06-24 11:00:00	2020-09-10 19:56:22.749027	\N
647	632	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.749771	\N
648	631	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.750484	\N
649	630	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.751166	\N
650	193	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.751915	\N
651	194	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.752629	\N
652	195	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.753456	\N
653	196	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.754525	\N
654	197	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.755404	\N
655	198	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.756239	\N
656	199	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.757009	\N
658	180	yes	yes	yes	yes	yes	yes	"removed stakes, braces"	WB	2019-07-02 11:00:00	2020-09-10 19:56:22.758463	\N
659	181	yes	yes	yes	yes	yes	yes	"removed stakes, braces"	WB	2019-07-02 11:00:00	2020-09-10 19:56:22.759269	\N
660	182	yes	yes	yes	yes	yes	yes	"removed stakes, braces"	WB	2019-07-02 11:00:00	2020-09-10 19:56:22.759982	\N
661	183	yes	yes	yes	yes	yes	yes	"removed stakes, braces"	WB	2019-07-02 11:00:00	2020-09-10 19:56:22.760743	\N
662	184	yes	yes	yes	yes	yes	yes	"removed stakes, braces"	WB	2019-07-02 11:00:00	2020-09-10 19:56:22.761498	\N
663	185	yes	yes	yes	yes	yes	yes	"removed stakes, braces"	WB	2019-07-02 11:00:00	2020-09-10 19:56:22.762206	\N
664	186	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.762961	\N
665	187	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.763689	\N
666	188	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.76443	\N
667	192	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.765135	\N
668	248	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.766002	\N
669	249	yes	yes	yes	yes	yes	yes		WB	2019-07-02 11:00:00	2020-09-10 19:56:22.766854	\N
670	624	no	no	no	yes	yes	no	"Dead on 7/3/19. Trunk removed, stakes retained"	WB	2019-07-03 11:00:00	2020-09-10 19:56:22.7676	\N
671	625	yes	yes	yes	yes	yes	yes	"Not loyesing well, needs water?"	WB	2019-07-03 11:00:00	2020-09-10 19:56:22.768458	\N
672	626	yes	yes	yes	yes	yes	yes		WB	2019-07-03 11:00:00	2020-09-10 19:56:22.769472	\N
673	627	yes	yes	yes	yes	yes	yes		WB	2019-07-03 11:00:00	2020-09-10 19:56:22.770397	\N
674	612	yes	yes	yes	yes	yes	yes		WB	2019-07-03 11:00:00	2020-09-10 19:56:22.771444	\N
675	613	yes	yes	yes	yes	yes	yes		WB	2019-07-03 11:00:00	2020-09-10 19:56:22.77243	\N
676	614	yes	yes	yes	yes	yes	yes		WB	2019-07-03 11:00:00	2020-09-10 19:56:22.773273	\N
677	463	yes	no	yes	yes	yes	no	"planting stake removed 3/28, planting/trash, planting"	WB	2019-07-03 11:00:00	2020-09-10 19:56:22.774199	\N
678	462	yes	no	yes	yes	yes	no	"planting stake removed 3/28, planting/trash, planting"	WB	2019-07-03 11:00:00	2020-09-10 19:56:22.775314	\N
679	461	yes	no	yes	yes	yes	no	"Planting stake removed 3/28, Various injuries to limbs and trunk, planting/trash, planting"	WB	2019-07-03 11:00:00	2020-09-10 19:56:22.776418	\N
680	460	yes	no	yes	yes	yes	no	"planting stake removed 2/21, planting/trash, planting"	WB	2019-07-03 11:00:00	2020-09-10 19:56:22.777419	\N
681	459	yes	no	yes	yes	yes	no	"planting stake removed 3/28, planting/trash, planting"	WB	2019-07-03 11:00:00	2020-09-10 19:56:22.778462	\N
682	464	yes	yes	yes	yes	yes	yes		WB	2019-07-03 11:00:00	2020-09-10 19:56:22.779612	\N
683	356	yes	yes	yes	yes	yes	yes		WB	2019-07-08 11:00:00	2020-09-10 19:56:22.780844	\N
684	157	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.781903	\N
685	159	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.782986	\N
686	161	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.78427	\N
687	160	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.785534	\N
688	162	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.786632	\N
689	174	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.787893	\N
690	164	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.789171	\N
691	165	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.790553	\N
692	166	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.791758	\N
693	163	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.793902	\N
694	158	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.79521	\N
695	167	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.79621	\N
696	223	Yes	yes	yes	yes	yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.797101	\N
697	222	Yes	yes	yes	yes	yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.797967	\N
698	175	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.79884	\N
699	168	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.799802	\N
700	220	Yes	yes	yes	yes	yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.800892	\N
701	221	Yes	yes	yes	yes	yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.801941	\N
702	219	Yes	yes	yes	yes	yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.802999	\N
703	218	Yes	yes	yes	yes	yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.804054	\N
704	169	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.805447	\N
705	176	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.806518	\N
706	177	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.807455	\N
707	170	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.80839	\N
708	171	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.812336	\N
709	178	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.813573	\N
710	172	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.814534	\N
711	173	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.815443	\N
712	225	Yes	yes	yes	yes	yes	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.816324	\N
713	228	Yes	yes	yes	yes	yes	yes	1 loose brace	WB	2019-07-10 11:00:00	2020-09-10 19:56:22.818192	\N
714	250	Yes	yes	yes	yes	yes	yes	1 brace	WB	2019-07-10 11:00:00	2020-09-10 19:56:22.819286	\N
715	224	Yes	yes	yes	no	no	yes		WB	2019-07-10 11:00:00	2020-09-10 19:56:22.820101	\N
716	410	yes	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.82092	\N
717	411	yes	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.821762	\N
718	412	yes	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.822589	\N
719	413	yes	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.823394	\N
720	414	yes	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.824447	\N
721	409	yes	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.825374	\N
722	129	yes	no	yes	yes	yes	no	Planting stake still attached. May need some selective pruning to remove stake and brace which should be soon.	WB	2019-07-15 11:00:00	2020-09-10 19:56:22.826374	\N
723	281	yes	no	yes	yes	yes	no	"Plants, owners mulched"	WB	2019-07-15 11:00:00	2020-09-10 19:56:22.827378	\N
724	283	yes	no	yes	yes	yes	no	"Planting stake still attached, plants"	WB	2019-07-15 11:00:00	2020-09-10 19:56:22.828472	\N
725	284	yes	no	yes	yes	yes	no	"Planting stake still attached, plants"	WB	2019-07-15 11:00:00	2020-09-10 19:56:22.829682	\N
726	587	yes	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.830932	\N
727	355	yes	yes	No	yes	yes	yes	scraggly	WB	2019-07-15 11:00:00	2020-09-10 19:56:22.83197	\N
728	678	yes	no	yes	yes	yes	no	"Plants, owners mulched"	WB	2019-07-15 11:00:00	2020-09-10 19:56:22.832931	\N
729	321	yes	no	No	no	no	no	"Needs stake and brace removed, major pruning beyond my pay grade. NEEDS MAKEOVER"	WB	2019-07-15 11:00:00	2020-09-10 19:56:22.834107	\N
730	317	yes	yes	yes	no	no	no		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.835512	\N
731	345	fair	yes	Yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.836748	\N
732	517	fair	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.83785	\N
733	518	fair	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.839153	\N
734	519	fair	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.840301	\N
735	520	fair	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.841374	\N
736	521	fair	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.842608	\N
737	334	yes	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.843889	\N
738	333	yes	yes	yes	yes	yes	yes		WB	2019-07-15 11:00:00	2020-09-10 19:56:22.84499	\N
739	332	yes	yes	yes	yes	yes	yes	monitor the dieback (as of June 2017)	WB	2019-07-15 11:00:00	2020-09-10 19:56:22.845899	\N
740	415	yes	No	no	no	no	no	"scraggly, weeds"	WB	2019-07-15 11:00:00	2020-09-10 19:56:22.846782	\N
741	65	yes	yes	yes	no	no	yes		WB	2019-07-29 11:00:00	2020-09-10 19:56:22.847779	\N
742	69	yes	lawn	yes	no	no	lawn		WB	2019-07-29 11:00:00	2020-09-10 19:56:22.848642	\N
743	66	yes	yes	yes	yes	yes	yes		WB	2019-07-29 11:00:00	2020-09-10 19:56:22.849526	\N
744	67	yes	yes	yes	yes	yes	yes		WB	2019-07-29 11:00:00	2020-09-10 19:56:22.850445	\N
745	68	yes	yes	yes	yes	yes	yes		WB	2019-07-29 11:00:00	2020-09-10 19:56:22.851614	\N
746	661	yes	yes	yes	yes	Yes	yes	Heat-stressed; needs water	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.852698	\N
747	662	yes	yes	yes	yes	Yes	yes	Heat-stressed; needs water	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.853684	\N
748	663	yes	yes	yes	yes	Yes	yes	Needs water	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.854638	\N
749	664	yes	yes	yes	yes	Yes	yes		WB	2019-07-29 11:00:00	2020-09-10 19:56:22.855516	\N
750	665	yes	yes	yes	yes	Yes	yes	Needs water	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.856261	\N
751	289	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-29 11:00:00	2020-09-10 19:56:22.856962	\N
752	290	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-29 11:00:00	2020-09-10 19:56:22.857616	\N
753	291	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-29 11:00:00	2020-09-10 19:56:22.858347	\N
754	451	yes	yes	yes	yes	yes	yes		WB	2019-07-29 11:00:00	2020-09-10 19:56:22.859158	\N
755	279	yes	no	no	no	no	no	"Tree is being loyesed after, did not want to prune against wishes, lava rocks"	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.860061	\N
756	280	yes	yes	yes	yes	Yes	yes	"Heavy wounding on trunk, could use water."	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.860788	\N
757	583	yes	no	yes	Yes	Yes	no	"Planting strip landscaped, did not want to disturb"	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.86158	\N
758	465	Yes	no	yes	no	no	no	Removed suckers. rocks	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.862419	\N
759	403	No	No	No	Yes	Yes	No	"DEAD 7/29/19, Weeds"	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.863226	\N
760	402	yes	yes	yes	Yes	Yes	yes	"Heavy wounding on trunk, could use water."	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.863999	\N
761	278	Yes	yes	yes	Yes	Yes	yes	removed planting stake	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.864741	\N
762	277	Yes	yes	yes	Yes	Yes	yes	removed planting stake	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.865473	\N
763	276	Yes	yes	yes	no	no	yes	remove planting stake	WB	2019-07-29 11:00:00	2020-09-10 19:56:22.866182	\N
764	603	yes	yes	yes	yes	yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.866922	\N
765	604	yes	yes	yes	yes	yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.867728	\N
766	605	yes	yes	yes	yes	yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.868537	\N
767	606	yes	yes	yes	yes	yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.869387	\N
768	695	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.870291	\N
769	694	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.87118	\N
770	693	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.872198	\N
771	692	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.873144	\N
772	691	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.87402	\N
773	690	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.874974	\N
774	689	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.876053	\N
775	688	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.877498	\N
776	687	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.878716	\N
777	686	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.879736	\N
778	685	Yes	yes	yes	Yes	Yes	yes		WB	2019-07-30 11:00:00	2020-09-10 19:56:22.880578	\N
779	684	Yes	yes	yes	Yes	Yes	yes	"In shade of fence, doing well"	WB	2019-07-30 11:00:00	2020-09-10 19:56:22.881431	\N
780	683	Yes	yes	yes	Yes	Yes	yes	Exposed to round-up overspray	WB	2019-07-30 11:00:00	2020-09-10 19:56:22.8822	\N
781	682	Yes	yes	yes	Yes	Yes	yes	Exposed to round-up overspray	WB	2019-07-30 11:00:00	2020-09-10 19:56:22.882988	\N
782	681	Yes	yes	yes	Yes	Yes	yes	Exposed to round-up overspray	WB	2019-07-30 11:00:00	2020-09-10 19:56:22.883783	\N
783	418	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.884676	\N
784	419	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.885769	\N
785	229	yes	No	yes	yes	yes	No	lava rocks	WB	2019-08-19 11:00:00	2020-09-10 19:56:22.886757	\N
786	322	yes	yes	yes	yes	No	yes	"Pruned strangely when young, removed brace"	WB	2019-08-19 11:00:00	2020-09-10 19:56:22.887679	\N
787	286	yes	Yes	Yes	yes	yes	yes	"Lower limbs yes, loyesing top heavy, may need more significant pruning, black mulch"	WB	2019-08-19 11:00:00	2020-09-10 19:56:22.888804	\N
788	131	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.889858	\N
789	575	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.890746	\N
790	302	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.891516	\N
791	303	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.892267	\N
792	377	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.893102	\N
793	304	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.893827	\N
794	525	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.894558	\N
795	301	Yes	yes	yes	yes	yes	yes	y drip	WB	2019-08-19 11:00:00	2020-09-10 19:56:22.895319	\N
796	578	yes	yes	no	yes	yes	no	"Notes on tree from 8/8/18, could not locate on 8/19"	WB	2019-08-19 11:00:00	2020-09-10 19:56:22.896319	\N
797	323	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.897272	\N
798	1483	yes	No	yes	yes	yes	yes	Lava rocks	WB	2019-08-19 11:00:00	2020-09-10 19:56:22.898138	\N
799	643	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.898999	\N
800	641	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.900104	\N
801	644	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.901378	\N
802	642	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.902372	\N
803	420	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.90333	\N
804	579	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.904201	\N
805	523	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.905002	\N
806	524	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.905807	\N
807	580	yes	No	yes	yes	yes	yes	"owner notified me about spoted leaves. yes, but new growth as well. buckley doesn't sem alarmed 7/13/18. 8/20 tree loyess very bad. dying leaves"	WB	2019-08-19 11:00:00	2020-09-10 19:56:22.906615	\N
808	200	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.907473	\N
809	285	yes	yes	yes	yes	yes	yes	"bag weeds, mulch"	WB	2019-08-19 11:00:00	2020-09-10 19:56:22.908155	\N
810	357	No	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.908993	\N
811	358	No	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.909839	\N
812	354	yes	yes	yes	yes	yes	yes		WB	2019-08-19 11:00:00	2020-09-10 19:56:22.910554	\N
813	21								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.912075	\N
814	22								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.913077	\N
815	77								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.913815	\N
816	78								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.91465	\N
817	24								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.915527	\N
818	26								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.916352	\N
819	29								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.917284	\N
820	39								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.918241	\N
821	3								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.919207	\N
822	67								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.919878	\N
823	4								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.920682	\N
824	5								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.921392	\N
825	6								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.922263	\N
826	7								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.92301	\N
827	8								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.923926	\N
828	9								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.924882	\N
829	10								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.92583	\N
830	35								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.926782	\N
831	12								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.928028	\N
832	13								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.929202	\N
833	14								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.930438	\N
834	68								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.931513	\N
837	34								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.935333	\N
838	70								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.93649	\N
839	25								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.937682	\N
840	28								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.938727	\N
841	30								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.93978	\N
842	37								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.940942	\N
843	38								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.942049	\N
844	60								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.943106	\N
845	61								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.944087	\N
846	62								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.944981	\N
847	64								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.946015	\N
848	2								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.947034	\N
849	1								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.947835	\N
850	40								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.948598	\N
851	41								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.949393	\N
852	42								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.950119	\N
853	23								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.950918	\N
854	27								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.951687	\N
855	31								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.952514	\N
856	66								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.954452	\N
857	82								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.955369	\N
858	65								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.956171	\N
859	79								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.956953	\N
860	80								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.957746	\N
861	81								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.958612	\N
862	74								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.959589	\N
863	75								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.960326	\N
864	76								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.961	\N
865	43								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.961693	\N
866	44								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.962568	\N
867	45								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.96341	\N
868	46								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.9641	\N
869	47								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.964747	\N
870	48								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.965432	\N
871	49								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.966243	\N
872	50								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.967087	\N
873	51								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.967905	\N
874	52								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.968693	\N
875	59								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.969597	\N
876	63								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.970462	\N
877	15								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.971273	\N
878	16								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.972169	\N
879	17								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.973008	\N
880	18								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.973792	\N
881	19								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.974508	\N
882	20								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.975413	\N
883	69								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.976225	\N
884	71								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.976988	\N
885	72								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.977952	\N
886	73								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.979248	\N
887	53								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.980951	\N
888	54								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.982368	\N
889	55								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.983662	\N
890	56								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.984806	\N
891	57								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.985804	\N
892	58								DKS	2020-02-10 11:00:00	2020-09-10 19:56:22.986632	\N
893	95	yes	no	yes	yes	yes	yes	small/young but has buds all over branches & trunk	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.987469	\N
894	98	yes	no	yes	no	no	yes	"very large & vigorous, crown-raised 3/21"	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.988365	\N
895	96	yes	no	yes	yes	yes	yes		DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.989215	\N
896	97	yes	no	yes	yes	yes	yes	young & sparse but seems healthy	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.99012	\N
897	85	yes	yes	yes	yes	yes	yes	was leaning but our corrections seem to have worked	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.99103	\N
898	86	yes	yes	yes	no	no	yes		DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.99183	\N
899	87	yes	yes	yes	yes	no	yes	still unbalanced - continue to monitor & prune	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.992804	\N
900	92	yes	yes	yes	yes	no	yes	was leaning but our corrections seem to have worked	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.993574	\N
901	94	yes	yes	yes	yes	no	yes	was leaning but our corrections seem to have worked	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.994317	\N
902	91	yes	yes	yes	yes	yes	yes	"replacement tree, continue to monitor & prune"	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.995298	\N
903	93	yes	yes	yes	yes	yes	yes	"replacement tree, continue to monitor & prune"	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.996413	\N
904	88	yes	yes	yes	no	no	yes	some pruning 3/21 but needs ladder	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.997265	\N
905	89	yes	yes	yes	no	no	yes		DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.99816	\N
906	90	yes	yes	yes	no	no	yes	some pruning 3/21 but needs ladder	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.998864	\N
907	1273			yes				remove 1 of the codominant stems	DKS	2020-03-21 11:00:00	2020-09-10 19:56:22.999601	\N
910	420	yes	\N	\N	\N	\N	\N	Watered 6 gallons; looked like someone else just watered it. 	Susan Rambo	2020-09-19 22:20:53	2020-09-20 05:20:53.638765	\N
911	420	yes	\N	\N	\N	\N	\N	5 gallons of water	SMR	2020-09-28 11:18:44	2020-09-28 18:18:44.4731	\N
3000	3005	\N	yes	\N	\N	\N	yes	\N	\N	2020-11-11 00:04:36	2020-11-11 08:04:36.766229	\N
3001	3006	yes	yes	yes	\N	yes	\N	test	Rose	2020-11-11 00:15:38	2020-11-11 08:15:38.325082	\N
3002	3005	\N	\N	yes	\N	\N	\N	\N	\N	2020-11-12 01:29:51	2020-11-12 09:29:52.011874	\N
3006	3037	\N	\N	\N	\N	\N	\N	undefined PLANTED!!!	rommims	2020-11-16 00:00:00	2020-11-16 09:32:14.931748	\N
3007	3038	\N	\N	\N	\N	\N	\N	American elm PLANTED!!!	rommims	2020-11-16 00:00:00	2020-11-16 09:39:09.802417	\N
3008	3039	\N	\N	\N	\N	\N	\N	THIS AMERICAN ELM IS PLANTED!!!	rommims	2020-11-16 00:00:00	2020-11-16 09:41:12.559433	\N
3009	1602	\N	\N	yes	\N	\N	yes	\N	rommims	2020-11-16 10:50:13	2020-11-16 10:50:13.094194	\N
3010	1666	yes	\N	\N	\N	\N	yes	\N	rommims	2020-11-16 10:51:12	2020-11-16 10:51:13.007317	\N
3011	\N	\N	\N	\N	\N	\N	\N	THIS AMERICAN ELM IS PLANTED!!!	rommims	\N	2020-11-16 11:43:54.006574	\N
3012	3035	yes	\N	\N	\N	\N	yes	\N	rommims	2020-11-17 00:02:58	2020-11-17 00:02:58.484023	\N
3013	3041	yes	\N	yes	\N	yes	yes	THIS AMERICAN ASH IS PLANTED!!!	rommims	2020-11-17 00:05:46	2020-11-17 00:03:24.917379	2020-11-17 00:05:46.914391
3014	33183	\N	\N	\N	\N	\N	\N	THIS AMERICAN ELM IS PLANTED!!!	rommims	2020-11-19 00:00:00	2020-11-19 05:03:40.855545	\N
\.


--
-- Name: treehistory_id_treehistory_seq; Type: SEQUENCE SET; Schema: public; Owner: trees
--

SELECT pg_catalog.setval('public.treehistory_id_treehistory_seq', 3014, true);


--
-- Name: treehistory update_treehistory_modtime; Type: TRIGGER; Schema: public; Owner: trees
--

CREATE TRIGGER update_treehistory_modtime BEFORE UPDATE ON public.treehistory FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();


--
-- PostgreSQL database dump complete
--

