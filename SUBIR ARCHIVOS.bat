@echo off
REM ======================================
REM CONFIGURACIÓN – ¡EDITA ESTO!
set "PROJECT_DIR=C:\APPS BENET\ASISTENTE ALTA RETA"
set "REPO_URL=https://github.com/Bisnardo/ALTARETA.git"
set "USER_NAME=Bisnardo"
set "USER_EMAIL=ebenet74@gmail.com"
set "COMMIT_MSG=Proyecto inicial: agregar todos los archivos"
REM ======================================

echo.
echo --- 1. Configurando identidad global de Git ---
git config --global user.name "%USER_NAME%"
git config --global user.email "%USER_EMAIL%"

echo.
echo --- 2. Moviéndose al directorio del proyecto ---
cd /d "%PROJECT_DIR%" || (
  echo ERROR: No se puede acceder a %PROJECT_DIR%
  pause
  exit /b 1
)

echo.
if not exist ".git" (
  echo --- 3. Inicializando repositorio Git ---
  git init
) else (
  echo --- 3. Repositorio Git ya inicializado ---
)

echo.
echo --- 4. Generando/actualizando .gitignore ---
> .gitignore (
  echo /bin/
  echo /obj/
  echo .vs/
  echo *.user
)

echo.
echo --- 5. Añadiendo archivos al staging ---
git add .

echo.
echo --- 6. Creando commit inicial ---
git commit -m "%COMMIT_MSG%" || (
  echo NOTA: Puede que no haya cambios nuevos o falte identidad configurada.
)

echo.
echo --- 7. Renombrando la rama principal a main ---
git branch -M main

echo.
echo --- 8. Configurando remoto “origin” ---
git remote | findstr "^origin$" >nul
if errorlevel 1 (
  git remote add origin "%REPO_URL%"
  echo Remoto origin agregado.
) else (
  echo Remoto origin ya existe.
)

echo.
echo --- 9. Empujando cambios a GitHub ---
git push -u origin main || (
  echo ERROR: No se pudo empujar. Verifica URL y permisos.
)

echo.
echo ✔ Proceso completado.
echo Repositorio: %REPO_URL%
pause
