# Mapa naszych podróży

Pastelowa, „growa” mapa świata do przeglądania zdjęć i wspomnień z wyjazdów: balonik lata między miastami,
kraje kolorują się po odwiedzeniu, za każde miasto jest pieczątka, a za pieczątki odznaki.

## Jak to działa

To repozytorium zawiera **tylko kod strony** i grafiki odznak. Dane (wyjazdy, wspomnienia) i zdjęcia **nie trafiają
tutaj** – leżą na OneDrive osoby, która założyła mapę, w folderze aplikacji (mapa nie widzi innych plików):

```
Aplikacje/Mapa podróży/  (OneDrive)
├── dane/dane.json       ← wyjazdy, miasta, wspomnienia
├── dane/kopie/          ← dzienne kopie zapasowe
└── zdjecia/*.jpg        ← zdjęcia i miniatury
```

Strona (GitHub Pages) loguje osobę kontem Microsoft i czyta oraz zapisuje te pliki przez Microsoft Graph.
Każdy może założyć własną mapę na swoim OneDrive. Cudzą mapę otwiera się linkiem od właścicielki – działa tylko,
jeśli udostępniła folder mapy na OneDrive.

## Pliki

| Plik | Co to |
|---|---|
| `index.html` | cała aplikacja (składana z `zrodla/src.html`) |
| `konfiguracja.js` | identyfikator aplikacji Microsoft (`msClientId`, nie jest tajny) |
| `odznaki/` | grafiki odznak krajów i osiągnięć |
| `zrodla/` | kod źródłowy i skrypt `node build.mjs`, który składa `index.html` |

`.gitignore` blokuje `dane/` i `zdjecia/`, żeby prywatne pliki nigdy nie trafiły do publicznego repozytorium.

## Zmiany

Każda zmiana przychodzi jako pull request; po scaleniu GitHub Pages publikuje nową wersję.
