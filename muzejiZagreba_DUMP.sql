--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

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
-- Name: izlozba; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.izlozba (
    idizlozbe integer NOT NULL,
    nazivizlozbe character varying(300) NOT NULL,
    datumpocetka date NOT NULL,
    datumzavrsetka date NOT NULL,
    opis character varying(1500) NOT NULL,
    vrstaizlozbe character varying(100) NOT NULL,
    idmuzeja integer NOT NULL,
    CONSTRAINT izlozba_check CHECK ((datumpocetka < datumzavrsetka))
);


ALTER TABLE public.izlozba OWNER TO postgres;

--
-- Name: muzej; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.muzej (
    idmuzeja integer NOT NULL,
    nazivmuzeja character varying(100) NOT NULL,
    adresa character varying(100) NOT NULL,
    mail character varying(100) NOT NULL,
    webstranica character varying(300) NOT NULL,
    telefon character varying(20) NOT NULL
);


ALTER TABLE public.muzej OWNER TO postgres;

--
-- Data for Name: izlozba; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.izlozba (idizlozbe, nazivizlozbe, datumpocetka, datumzavrsetka, opis, vrstaizlozbe, idmuzeja) FROM stdin;
1	Između Praga i Kaira - 100 godina češke egiptologije	2023-10-03	2023-11-30	povijest	uživo	1
2	Rasvijetljena soba - Konflikt	2023-10-26	2023-11-26	fotografija	uživo	2
16	Hrvatska nematerijalna kulturna baština na UNESCO-ovim listama	2023-10-03	2023-11-19	prikaz projekta	uživo	2
3	KONTEJNER 3.0: Realities in Transition XR Camp – Prošireni svjetovi	2023-10-24	2023-10-29	moderna umjetnost	uživo	3
13	KONTEJNER 3.0: Izložba Živi sustavi – koncepti prirodne i umjetne drugosti u kolektivnim habitatima	2023-10-17	2023-10-29	moderna umjetnost	uživo	3
14	Vlatka Horvat: Dobro društvo/Okidači	2023-09-14	2023-11-12	moderna umjetnost	uživo	3
4	Marika Šafran Berberović - Bjeline; Svjetla; Sjene	2023-07-21	2024-07-21	slikarstvo	virtualna	4
15	Tradicija i suvremenost - Vječna potka inspiracije – Narodna umjetnost, priče, običaji, obrt i alati	2023-09-15	2024-04-15	dječja umjetnost	virtualna	4
5	Rasvijetljena soba - Ženska fotografska praksa u Hrvatskoj	2023-10-24	2023-12-03	fotografija	uživo	5
6	Nevidljivi portreti	2023-05-18	2023-06-18	umjetnost za slabovidne	uživo	6
7	Bršljan i Smilje - krasno bilje : uz 150. obljetnicu dvaju hrvatskih dječjih časopisa	2023-10-26	2023-12-09	književni rad	uživo	7
8	Ivana Franke “Resonance of the Unforeseen”	2023-10-12	2023-11-12	moderna umjetnost	uživo	8
9	Do novog HPM-a: Fondovi Europske unije i Grad Zagreb za novi Hrvatski prirodoslovni muzej	2023-10-26	2023-11-03	prikaz projekta	uživo	9
10	Najsvjetliji lik Crkve Božje u Hrvata	2018-05-09	2018-06-09	religija	uživo	10
11	Catino 20. stoljeće	2023-10-17	2024-02-04	memorijalna zbirka	uživo	11
12	Mi smo novi život	2023-10-10	2024-11-19	umjetnost za slabovidne	uživo	11
\.


--
-- Data for Name: muzej; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.muzej (idmuzeja, nazivmuzeja, adresa, mail, webstranica, telefon) FROM stdin;
1	Arheološki muzej Zagreb	Trg Nikole Šubića Zrinskog 19	amz@amz.hr	www.amz.hr	+385 1 4873 000
2	Etnografski muzej	Trg Mažuranića 14	emz@emz.hr	www.emz.hr	+385 1 4826 220
3	Muzej suvremene umjetnosti	Avenija Dubrovnik 17	msu@msu.hr	www.msu.hr	+385 1 6052 700
4	Muzej Mimara	Rooseveltov trg 5	mimara@mimara.hr	www.mimara.hr	+385 1 4828 100
5	Tehnički muzej Nikola Tesla	Savska cesta 18	info@tmnt.hr	www.tehnicki-muzej.hr	+385 1 4844 050
6	Tifološki muzej	Draškovićeva 80/II	info@tifoloskimuzej.hr	www.tifoloskimuzej.hr	+385 1 4811 102
7	Hrvatski školski muzej	Trg Republike Hrvatske 4	hsm@hsmuzej.hr	www.hsmuzej.hr	+385 1 4855 716
8	Lauba	Baruna Filipovića 23a	info@lauba.hr	www.lauba.hr	+385 1 6302 11
9	Hrvatski prirodoslovni muzej	Demetrova 1	info@hpm.hr	www.hpm.hr	+385 1 4851 700
10	Muzej blaženog Alojzija Stepinca	Kaptol 31	muzejstepinac@zg-nadbiskupija.hr	www.zg-nadbiskupija.hr/sveci-i-blazenici-crkve-u-hrvata/blazeni-alojzije-stepinac/muzej-bl-alojzija-stepinca	+385 1 4894 879
11	Muzej grada Zagreba	Opatička 20	mgz@mgz.hr	www.mgz.hr	+385 1 4851 361
\.


--
-- Name: izlozba izlozba_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.izlozba
    ADD CONSTRAINT izlozba_pkey PRIMARY KEY (idizlozbe);


--
-- Name: muzej muzej_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.muzej
    ADD CONSTRAINT muzej_pkey PRIMARY KEY (idmuzeja);


--
-- Name: izlozba izlozba_idmuzeja_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.izlozba
    ADD CONSTRAINT izlozba_idmuzeja_fkey FOREIGN KEY (idmuzeja) REFERENCES public.muzej(idmuzeja);


--
-- PostgreSQL database dump complete
--

