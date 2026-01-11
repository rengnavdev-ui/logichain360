Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "NexLogica FINAL PRE-FLIGHT CHECK" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

$pass = 0
$fail = 0

function Test-Item {
    param([string]$Name, [scriptblock]$Check, [string]$Fix)
    Write-Host "Checking $Name..." -NoNewline
    try {
        if (& $Check) {
            Write-Host " ✅ READY" -ForegroundColor Green
            $script:pass++
        } else {
            Write-Host " ❌ MISSING" -ForegroundColor Red
            Write-Host "   Fix: $Fix" -ForegroundColor Gray
            $script:fail++
        }
    } catch {
        Write-Host " ❌ ERROR" -ForegroundColor Red
        $script:fail++
    }
}

# 1. CORE ENGINES
Test-Item "Node.js (v18+)" { $v = (node -v); $v -match "v18" -or $v -match "v19" -or $v -match "v2" } "choco install nodejs-lts"
Test-Item "Python (3.10+)" { (python --version) -match "3.1" -or (python --version) -match "3.2" } "choco install python --version=3.10"
Test-Item "Docker" { (docker -v) -match "Docker" } "Start Docker Desktop"

# 2. FRONTEND SPECIALTIES (The ones we added)
Write-Host "`nChecking Client Libraries..." -ForegroundColor Yellow
Test-Item "React Speech (Voice)" { Test-Path "client/node_modules/react-speech-recognition" } "cd client; npm install react-speech-recognition"
Test-Item "React Leaflet (Maps)" { Test-Path "client/node_modules/react-leaflet" } "cd client; npm install react-leaflet leaflet"
Test-Item "Chart.js (Sustainability)" { Test-Path "client/node_modules/chart.js" } "cd client; npm install chart.js react-chartjs-2"
Test-Item "LocalForage (Offline DB)" { Test-Path "client/node_modules/localforage" } "cd client; npm install localforage"

# 3. BACKEND & AI
Write-Host "`nChecking Backend & AI..." -ForegroundColor Yellow
Test-Item "Backend Modules" { Test-Path "server/node_modules/express" } "cd server; npm install"
Test-Item "AI Venv" { Test-Path "ai-engine/venv" } "cd ai-engine; python -m venv venv"

# 4. CONFIGURATION FILES
Write-Host "`nChecking Secrets..." -ForegroundColor Yellow
Test-Item "Server .env" { Test-Path "server/.env" } "Create server/.env with MONGODB_URI"
Test-Item "Client .env" { Test-Path "client/.env" } "Create client/.env with VITE_API_URL"
Test-Item "Blockchain .env" { Test-Path "blockchain/.env" } "Create blockchain/.env with PRIVATE_KEY"

# 5. GLOBAL TOOLS
Write-Host "`nChecking Global Tools..." -ForegroundColor Yellow
Test-Item "Hardhat" { (npx hardhat --version) } "npm install -g hardhat"
Test-Item "Ngrok (Optional but rec)" { (Get-Command ngrok -ErrorAction SilentlyContinue) } "choco install ngrok"

Write-Host "`n=============================================" -ForegroundColor Cyan
if ($fail -eq 0) {
    Write-Host "🚀 ALL SYSTEMS GO! YOU ARE READY." -ForegroundColor Green
} else {
    Write-Host "⚠️  $fail ITEMS NEED ATTENTION BEFORE START." -ForegroundColor Yellow
}
Write-Host "=============================================" -ForegroundColor Cyan
