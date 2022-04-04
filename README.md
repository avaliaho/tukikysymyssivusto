# Tukikysymyssivusto

Lahden LAB-ammattikorkeakoulun opinnäytetyön artefakti. Valmistumisvuosi 2022. Aleksander Väliaho.

# Opinnäytetyön tausta, tavoite ja rajaus

Opinnäytetyöaiheenani on toteuttaa toimeksiantajalle Stack Overflow -tyyppinen ohjelmistoratkaisu, joka on kysymys-vastaus-periaatteella toimiva asiakastukikysymys-sivusto. Toimeksiantajalla on ohjelmistotuote, jota he haluavat myydä. He saavat usein sähköpostiin toistuvia kysymyksiä asiakkailta ohjelmiston käyttöönottoon ja tukeen liittyen. Näihin vastaaminen on osoittautunut liian työlääksi, joten nyt onkin tarkoituksena luoda sivusto, jossa on kootusti yhdessä paikkaa asiakkaiden lähettämät kysymykset ja toimeksiantajan kirjoittamat vastaukset.

Opinnäyteraportin lisäksi opinnäytetyön tuloksena toteutetaan toimeksiantajalle käytettäväksi toimiva sivusto, jonka avulla asiakkaat voivat lähettää tukikysymyksiä ja saada niihin vastauksia kootusti yhdestä paikasta. Lopputuotteena syntyvä sivusto toimii web-selaimessa, eikä se ole esimerkiksi mobiilisovellus. 

Työ rajataan siten, että kuka tahansa CAPTCHA-varmennuksen läpäissyt ihminen voi kirjoittaa kysymyksiä sivustolle, eikä esimerkiksi sisäänkirjautumista tulla toteuttamaan.

# Sovelluksen arkkitehtuuri

Opinnäytetyön lopputuloksena rakentuva internet-selainpohjainen sovellus rakentuu kahdesta itsenäisestä ohjelmistokokonaisuudesta. Käyttöliittymä ohjelmoidaan Angular 11 -web-frameworkilla ja Wordpress-sisällönhallintajärjestelmän REST-ohjelmointirajapinta toimii linkkinä käyttöliittymän ja tietokannan välillä. 

# Toimeksiantajan erityisvaatimus

Erikoisuutena sivulla on Stack Overflow -sivustolta tuttu lisäominaisuus, jossa kun käyttäjä alkaa kirjoittaa uudelle kysymykselle otsikkoa käynnistetään haku Wordpressin tietokantaan ja etsitään samankaltaisia jo olemassa olevia kysymyksiä. Tämän idea on auttaa käyt-täjä löytämään jo olemassa olevia kysymyksiä, mikäli uuden kysymyksen ja vanhojen ky-symysten otsikoista löydetään samoja piirteitä. Idea on se, että vältyttäisiin mahdollisilta kopioilta kysyttäessä uutta kysymystä. 