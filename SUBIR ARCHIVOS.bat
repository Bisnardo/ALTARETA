@echo off
SETLOCAL

REM —————————————————————
REM  CONFIGURA SOLO ESTO:
set "PROJECT_DIR=C:\APPS BENET\ASISTENTE ALTA RETA"
set "REPO_URL=https://github.com/Bisnardo/ALTARETA.git"
set "USER_NAME=Bisnardo"
set "USER_EMAIL=ebenet74@gmail.com"
set "COMMIT_MSG=Proyecto inicial: todos los archivos"
REM —————————————————————

echo.
echo 1) Configurando identidad global de Git...
git config --global user.name "%USER_NAME%"
git config --global user.email "%USER_EMAIL%"

echo.
echo 2) Cambiando al directorio del proyecto...
cd /d "%PROJECT_DIR%" || (
  echo ERROR: no existe "%PROJECT_DIR%"
  pause
  exit /b 1
)

echo.
echo 3) Inicializando (o reusando) repositorio Git...
git init

echo.
echo 4) Generando/actualizando .gitignore...
> .gitignore (
  echo /bin/
  echo /obj/
  echo .vs/
  echo *.user
)

echo.
echo 5) Añadiendo todos los archivos al staging...
git add .

echo.
echo 6) Haciendo commit inicial...
git commit -m "%COMMIT_MSG%" || echo Nota: no había cambios nuevos.

echo.
echo 7) Renombrando rama principal a main...
git branch -M main

echo.
echo 8) Configurando remoto "origin"...
git remote remove origin >nul 2>&1
git remote add origin "%REPO_URL%" >nul 2>&1 && echo Remoto origin configurado.

echo.
echo 9) Empujando cambios a GitHub...
git push -u origin main || echo ERROR: no se pudo empujar. Verifica URL/permisos.

echo.
echo ✔ Proceso completado.
echo   Repositorio: %REPO_URL%
pause
