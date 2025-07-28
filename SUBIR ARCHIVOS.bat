@echo off
REM ——————————————————————————————
REM CONFIGURACIÓN (¡edita estos valores!)
set "PROJECT_DIR=C:\APPS BENET\ASISTENTE ALTA RETA"
set "REPO_URL=https://github.com/Bisnardo/ALTARETA.git"
set "USER_NAME=Bisnardo"
set "USER_EMAIL=ebenet74@gmailcom"
set "COMMIT_MSG=Proyecto inicial: agregar todos los archivos"
REM ——————————————————————————————

REM 1. Configurar identidad global de Git
echo Configurando identidad de Git...
git config --global user.name "%USER_NAME%"
git config --global user.email "%USER_EMAIL%"

REM 2. Ir al directorio de tu proyecto
cd /d "%PROJECT_DIR%"

REM 3. Inicializar git si no existe
if not exist ".git" (
    echo Inicializando repositorio Git en "%PROJECT_DIR%"...
    git init
) else (
    echo Repositorio Git ya inicializado.
)

REM 4. Generar .gitignore básico
echo Generando .gitignore...
(
    echo /bin/
    echo /obj/
    echo .vs/
    echo *.user
) > .gitignore

REM 5. Añadir archivos y hacer commit
echo Añadiendo archivos al staging...
git add .
echo Haciendo commit inicial...
git commit -m "%COMMIT_MSG%"

REM 6. Asegurar que la rama principal se llame main
echo Estableciendo rama main...
git branch -M main

REM 7. Añadir remoto “origin” si no está configurado
git remote | findstr /c:"origin" >nul
if errorlevel 1 (
    echo Añadiendo remoto origin...
    git remote add origin "%REPO_URL%"
) else (
    echo Remoto origin ya existe.
)

REM 8. Empujar a GitHub
echo Empujando a GitHub...
git push -u origin main

echo.
echo ✔ Tu proyecto ha sido subido correctamente a:
echo   %REPO_URL%
pause
