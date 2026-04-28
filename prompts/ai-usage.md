# AI használat dokumentációja

## Eszköz

A fejlesztés során **Claude Code CLI**-t használtam, **Claude Sonnet 4.5** modellel. Mivel ez nem GitHub Copilot, a beszélgetések nem exportálhatók, így pár példát gyűjtöttem össze a ténylegesen használt promptok alapján.

---

## Mire használtam az AI-t

### 1. Boilerplate kód generálás

A projekt során sok hasonló struktúrájú kódot kellett megírni (controller, service, repository, DTO, mapper). Ezeket az AI segítségével gyorsítottam fel, megmutatva egy már meglévő implementációt mintaként.

**Jól működő prompt példa:**

> "Van egy meglévő `BookService` és `BookController` osztályom Spring Boot-ban. Ugyanilyen struktúrában írj egy `WishlistService`-t és `WishlistController`-t, amely kezeli a bejelentkezett felhasználó kívánságlistáját. Az entitás struktúra: egy `Wishlist` entitás (1:1 kapcsolat `User`-rel) és `WishlistItem` (Many-to-One `Book`-ra). Szükséges műveletek: hozzáadás, eltávolítás, teljes törlés, lekérés, és ellenőrzés hogy egy adott könyv szerepel-e a listán."

*Miért működött jól:* Konkrét minta volt megadva, a struktúra és az elvárások egyértelműek voltak, az entitás kapcsolatokat is leírtam.

---

**Rosszul működő prompt példa:**

> "Írj egy wishlist funkciót."

*Miért nem működött:* Túl általános volt. Az eredmény nem illeszkedett a meglévő kód struktúrájához (más naming convention, hiányzott a JWT integráció, nem használta a Facade pattern-t amit a többi modulnál alkalmaztam).

---

### 2. Hibakeresés

Stack trace-eket és hibaüzeneteket másoltam be a releváns kódrészletekkel együtt. Ez általában pontos megoldást eredményezett.

**Jól működő prompt példa:**

> "A következő hibát kapom indításkor: `org.hibernate.MappingException: Could not determine type for: java.util.List, at table: books, for columns: [org.hibernate.mapping.Column(authors)]`. Az entitás így néz ki: [kódrészlet]. PostgreSQL array típust szeretnék használni."

*Miért működött jól:* A hibaüzenet és a releváns kódrészlet együtt volt megadva, így az AI pontosan azonosítani tudta a problémát (hiányzó `@Type` annotáció a Hibernate array kezeléshez).

---

**Rosszul működő prompt példa:**

> "Miért nem működik a bejelentkezés?"

*Miért nem működött:* Kontextus nélkül az AI általános tippeket adott (CORS, token lejárat, stb.), amelyek nem mutattak rá a tényleges problémára.

---

### 3. Dokumentáció generálás

A szoftverdokumentáció (`docs/documentation.md`) megírásához használtam az AI-t. Megadtam a projekt struktúráját, a technológiai döntések mögötti saját indoklásaimat, és a funkciók listáját, az AI ebből összefüggő, jól strukturált dokumentációt generált.

**Jól működő prompt példa:**

> "Segíts megírni a projekt szoftverdokumentációját magyarul. Technológiai stack: React, Material UI, Spring Boot Java, Postgres. Az indokláshoz: korábban dolgoztam már ezekkel, React-ban a JSX gyors fejlesztést tesz lehetővé, Spring Boot-ban szeretem a struktúrát amit ad a kódnak, Postgres-nél jól jött a JSON tárolás. A dokumentációnak tartalmaznia kell funkcionális és nem-funkcionális követelményeket is, szerepkör szerint: USER, MANAGER, ADMIN."

*Miért működött jól:* Saját indoklásokat adtam meg kiindulópontként, a struktúra elvárások egyértelműek voltak, és megadtam a célnyelvet is.

---

### 4. Liquibase migráció generálás

Új adatbázis táblák létrehozásakor a Liquibase YAML changeset-eket az AI generálta a Java entitás osztály alapján.

**Jól működő prompt példa:**

> "Az alábbi két JPA entitás alapján írj Liquibase YAML changeset-et, amely létrehozza a `wishlists` és `wishlist_items` táblákat. A többi migráció fájl struktúráját kövesd (pl. `changelog-012-...yaml` mintájára). [Wishlist.java és WishlistItem.java kódrészletek]"

*Miért működött jól:* A meglévő migrációs fájlok stílusát referenciaként adtam meg, és az entitás kód pontosan definiálta a szükséges mezőket és kapcsolatokat.

---

### 5. Teszt adatok generálása

Demo célokra teszt adatokat is generáltam AI segítségével. Amazon könyv részleteit másoltam be, és az AI létrehozta a strukturált adatokat CSV formátumban, illetve TXT fájlban könnyen másolható formában.

**Jól működő prompt példa:**

> "Az alábbi Amazon könyv adatokból hozz létre egy CSV fájlt, ami követi a meglévő `amazon_books.csv` és `amazon_books2.csv` formátumát. Fontos, hogy a genre-ök a helyi PostgreSQL adatbázisban létező műfajok közül legyenek (ezeket a `docker exec` paranccsal lehet lekérni a `genres` táblából). [Amazon könyv részletek bemásolva]"

*Miért működött jól:* Konkrét formátumot adtam meg referenciaként (meglévő CSV fájlok), és expliciten kértem, hogy ellenőrizze a létező genre-öket az adatbázisban, így a generált adatok kompatibilisek voltak a rendszerrel.

---

**Általános tanulság:** Az AI akkor adott hasznos választ, ha kellő kontextust (minta kód, hibaüzenet, elvárások) adtam meg. Általános, rövid promptokra általános és nem illeszkedő válaszok érkeztek. Bevált technikának bizonyult a promptok végére odaírni, hogy ha valamit nem ért vagy több lehetséges megközelítés is létezik, kérdezzen rá (clarifying questions) mielőtt nekiáll a megvalósításnak — ez megakadályozta, hogy az AI rossz irányba induljon el, és pontosabb végeredményt adott.
