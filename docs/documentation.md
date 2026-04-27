# Konyvesbolt – Szoftverdokumentáció

## 1. Bevezetés

A projekt egy teljes körű online könyvesbolt webalkalmazás, amely lehetővé teszi a felhasználók számára könyvek böngészését, vásárlását és kedvencek kezelését. Az alkalmazás háromrétegű architektúrára épül: PostgreSQL adatbázis, Spring Boot REST API szerver, valamint React alapú webes kliens.

---

## 2. Technológiai stack és indoklás

### 2.1 Frontend

- **React** – Doldogztam már vele, a JSX szintaxis gyors UI fejlesztést tesz lehetővé, a komponens alapú megközelítés pedig jól újrafelhasználható kódot eredményez
- **TypeScript** – Típusbiztonság, amely compile-time hibákat fed fel és megkönnyíti a refaktorálást
- **Material UI (MUI)** – Kész, reszponzív UI komponenskönyvtár, konzisztens design rendszerrel
- **React Query (TanStack)** – Szerver oldali állapotkezelés: automatikus cache, háttérben való újratöltés, loading/error állapotok kezelése
- **Zustand** – Egyszerű state management
- **React Hook Form + Zod** – Form kezelés és validáció
- **React Router** – Routing
- **Axios** – HTTP kliens JWT interceptorral
- **Vite** – Gyors fejlesztői szerver és build eszköz

### 2.2 Backend

- **Spring Boot (Java 21)** – Dolgoztam már vele, szeretem a struktúrát, amit a kódnak ad: a rétegek (controller, service, repository) egyértelműen elkülönülnek. Beépített Spring Security, JPA és sok más modulja gyors fejlesztést tesz lehetővé
- **Spring Security + JWT** – Security megvalósítás
- **Spring Data JPA / Hibernate** – ORM réteg, amely csökkenti az adatbázis boilerplate kódot. Specification pattern a dinamikus szűrőkhöz
- **Hibernate Envers** – Automatikus audit trail: az entitások változásai verziózottan tárolódnak
- **MapStruct** – Automatikus DTO ↔ entitás leképezés, kevesebb kézzel írt kód
- **Liquibase** – Verziókövetett adatbázis sémamigrációk
- **SpringDoc OpenAPI** – Automatikus Swagger dokumentáció

### 2.3 Adatbázis

- **PostgreSQL 16** – A projektben jól jött a PostgreSQL JSONB típustámogatása: a könyv metaadatokat, szállítási címeket és felhasználói preferenciákat rugalmasan, séma nélkül lehet tárolni. Emellett az array típus (szerzők, formátumok) is hasznos volt

### 2.4 Infrastruktúra

- **Docker + docker-compose** – Reprodukálható fejlesztői futtatási környezet

---

## 3. Funkcionális követelmények

### 3.1 Nyilvános felhasználó (nem bejelentkezett)

- Főoldal megtekintése: legújabb könyvek, aktív szezonális akciók, bestseller előnézet, műfaj statisztikák
- Könyvek böngészése lapozással
- Keresés és szűrés: teljes szöveges keresés, műfaj, ár tartomány, szerző, ISBN, készlet állapot szerinti szűrés
- Rendezés: legújabb, ár növekvő/csökkenő, népszerűség, cím szerint
- Könyv adatlap megtekintése (cím, szerzők, ár, leírás, formátumok, műfajok, készlet)
- Ajánlott könyvek megtekintése az adatlapon - korábbi vásárlások vagy megegyező műfaj alapján
- Bestseller lista (heti és havi)
- Regisztráció új felhasználóként
- Bejelentkezés

### 3.2 USER – bejelentkezett vásárló

A nyilvános funkciók mellett:

**Bevásárlókosár**
- Könyv kosárba helyezése (formátum és mennyiség választással)
- Mennyiség módosítása a kosárban
- Tétel eltávolítása a kosárból
- Kosár állapotának megőrzése oldalbetöltések között (localStorage)

**Kívánságlista**
- Könyv hozzáadása kívánságlistához (szív ikon az adatlapon)
- Könyv eltávolítása a kívánságlistáról
- Teljes kívánságlista törlése
- Kívánságlista oldal megtekintése

**Rendelés**
- Rendelés leadása: szállítási cím és fizetési mód megadásával
- Kedvezmény alkalmazása rendeléskor:
  - Hűségprogram kedvezmény (ha tag)
  - Aktív szezonális akció (ha érvényes)
- Rendelés megerősítő oldal megtekintése
- Saját rendelések előzményeinek megtekintése
- Függőben lévő rendelés lemondása

**Profil és beállítások**
- Profiladatok szerkesztése
- Jelszó megváltoztatása
- Felhasználói preferenciák beállítása
- Fiók törlése

### 3.3 MANAGER

A USER funkciói mellett (manager felületen):

**Dashboard**
- Napi, heti, havi rendelésszám és bevétel megtekintése
- Függőben lévő rendelések száma (figyelmeztetéssel)
- Alacsony készletű könyvek száma (kritikus jelzéssel)
- Legutóbbi 5 rendelés gyors áttekintése
- Materializált nézetek manuális frissítése

**Könyvkezelés**
- Könyvek listázása, keresése, szűrése (készlet, rendezés)
- Új könyv létrehozása (cím, szerzők, ISBN, kiadó, ár, készlet, műfajok, formátumok, leírás, metaadatok)
- Meglévő könyv szerkesztése
- Könyv törlése (soft delete)
- Tömeges CSV feltöltés + sablon letöltése + feltöltési eredmények megtekintése

**Műfajkezelés**
- Műfajok listázása és keresése
- Új műfaj létrehozása
- Meglévő műfaj szerkesztése
- Műfaj törlése

**Szezonális kedvezmények kezelése**
- Kedvezmények listázása, szűrése
- Új kedvezmény létrehozása (név, százalék, érvényességi időszak, hatókör, max. felhasználások)
- Meglévő kedvezmény szerkesztése
- Kedvezmény aktiválása / deaktiválása
- Kedvezmény törlése

**Rendeléskezelés**
- Rendelések listázása, szűrése (státusz, dátum, összeg, felhasználó)
- Rendelés részletes adatainak megtekintése
- Rendelés státuszának frissítése: PENDING → PAID → SHIPPED → DELIVERED / CANCELLED

**Felhasználókezelés**
- Felhasználók listázása, szűrése (email, név, szerepkör, hűségprogram tagság)
- Felhasználó hűségprogram tagságának és kedvezmény százalékának módosítása

### 3.4 ADMIN

A MANAGER összes funkciója, kiegészítve:

- Felhasználó szerepkörének módosítása (USER / MANAGER / ADMIN)
- Új felhasználó létrehozása (közvetlen regisztráció admin felületről)

---

## 4. Nem-funkcionális követelmények

### 4.1 Biztonság

- **JWT hitelesítés:** Access token és refresh token kombinációja. A refresh token az adatbázisban tárolódik, érvénytelenítés kijelentkezéskor.
- **BCrypt jelszó hash:** A jelszavak soha nem kerülnek plain text formában tárolásra.
- **Szerepkör-alapú hozzáférés-vezérlés:** Spring Security `@PreAuthorize` annotációkkal és frontend route guard-okkal (`ProtectedRoute`, `ManagerRoute`). Három szint: USER, MANAGER, ADMIN.

### 4.2 Teljesítmény

- **Materializált nézetek (PostgreSQL):** Előre kiszámított adatok a bestseller listákhoz, műfaj statisztikákhoz és ajánlott könyvekhez. A nézetek manuálisan frissíthetők a manager felületről. De cron jobok is futnak, amik időnként frissítik automatikusan.
- **Pessimistic locking:** Könyv készlet csökkentésekor `PESSIMISTIC_WRITE` lock biztosítja, hogy párhuzamos rendelések esetén ne fordulhasson elő túlrendelés.
- **React Query cache:** Szerver oldali adatok kliens oldali gyorsítótárazása, felesleges API hívások minimalizálása.
- **Lapozás:** Minden lista végpont lapozott (alapértelmezetten 20 elem/oldal), így a nagy adatmennyiség nem terheli le a hálózatot.

### 4.3 Adatintegritás

- **Soft delete:** Felhasználók és könyvek törlése nem fizikai törlés, hanem `deleted_at` időbélyeg beállítása. Az adatok megőrződnek.
- **Audit trail (Hibernate Envers):** A rendelések és rendelés tételek minden változása naplózva van külön audit táblákban (`orders_aud`, `order_items_aud`).
- **Liquibase migrációk:** Az adatbázis séma változásai verziókövetettek.
- **Input validáció:** Backend oldalon Bean Validation (`@Valid`) annotációkkal, frontend oldalon Zod sémákkal és React Hook Form-mal.

### 4.4 Felhasználói élmény

- **Reszponzív design:** Material UI Grid használata.
- **Loading skeleton:** Adatok betöltése közben skeleton placeholder komponensek jelennek meg, így a felület nem "ugrik".
- **Toast értesítések:** Minden fontos művelet (kosárba adás, rendelés, mentés, hiba) után azonnali visszajelzés.
- **Unsaved changes dialog:** Szerkesztő oldalakon figyelmeztetés nem mentett változásokra navigálás előtt.

### 4.5 Adatmodell

Az adatbázis **8 entitást** tartalmaz megfelelő kapcsolatkezeléssel:

| Entitás | Leírás |
|---|---|
| `User` | Felhasználók adatai, szerepkör, hűségprogram, preferenciák (JSONB), soft delete |
| `Book` | Könyvek adatai, szerzők (array), formátumok (array), metaadatok (JSONB), soft delete |
| `Genre` | Könyv műfajok |
| `Order` | Rendelések, szállítási cím (JSONB), fizetési adat (JSONB), audit trail |
| `OrderItem` | Rendelés tételek (könyv, mennyiség, ár), audit trail |
| `SeasonalDiscount` | Szezonális kedvezmények, érvényességi időszak, hatókör |
| `Wishlist` | Felhasználó kívánságlistája (1:1 User kapcsolat) |
| `WishlistItem` | Kívánságlista elemek |

**Kapcsolatok:**
- `User` → `Order` (One-to-Many)
- `Order` → `OrderItem` (One-to-Many)
- `Book` ↔ `Genre` (Many-to-Many)
- `User` → `Wishlist` (One-to-One)
- `Wishlist` → `WishlistItem` (One-to-Many)
- `WishlistItem` → `Book` (Many-to-One)

**Demó adatok:** Az alkalmazás indításakor Liquibase migráció tölt be 4 tesztfelhasználót (user@test.com, manager@test.com, admin@test.com, loyalty@test.com — jelszó: `password`). A könyvadatok CSV feltöltéssel tölthetők be.
