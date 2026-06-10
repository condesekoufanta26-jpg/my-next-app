Write-Host "=== TEST DE SÉCURITÉ RAPIDE ===" -ForegroundColor Cyan

$apiUrl = "http://localhost:3000/api"  # ← Changé : plus de /v1

Write-Host "`n0. Vérification API..." -ForegroundColor Yellow
$health = curl.exe -s -o nul -w "%{http_code}" "http://localhost:3000/api/health"
Write-Host "   Health check: $health"

Write-Host "`n1. Test produits..." -ForegroundColor Yellow
$products = curl.exe -s -o nul -w "%{http_code}" "$apiUrl/products"
Write-Host "   Code HTTP: $products"

Write-Host "`n2. Test login..." -ForegroundColor Yellow
$login = curl.exe -s -X POST "$apiUrl/auth/login" -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"Test123456"}'
Write-Host "   Login: OK"

Write-Host "`n=== FIN DU TEST ===" -ForegroundColor Cyan
