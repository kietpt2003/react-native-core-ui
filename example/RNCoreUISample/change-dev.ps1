# change env to dev
Copy-Item ".env.dev" ".env" -Force

# ensure react-native-config reads correct env
Set-Content -Path "$env:TEMP\envfile" -Value ".env.dev"

# change google-services files
# Copy-Item "documents/google-services/google-services-dev.json" "android/app/google-services.json" -Force
# Copy-Item "documents/google-services/google-services-dev.plist" "ios/GoogleService-Info.plist" -Force

# write strings.xml
@"
<resources>
    <string name="app_name" translatable="false">Estuary Dev Core UI</string>
</resources>
"@ | Set-Content "android/app/src/main/res/values/strings.xml"

# copy client secret
# if ($args[0] -eq "debug") {
#     Copy-Item "documents/google-services/dev-client-secret/debug-client_secret.json" "android/app/src/main/resources/client_secrets.json" -Force
# } else {
#     Copy-Item "documents/google-services/dev-client-secret/release-client_secret.json" "android/app/src/main/resources/client_secrets.json" -Force
# }

# auto open files in VS Code
code -r "package.json"
code -r ".env"
code -r "android/app/build.gradle"
code -r "android/app/src/main/res/values/strings.xml"
# code -r "android/app/google-services.json"

# Get values from package.json
$PACKAGE_VERSION = (Get-Content package.json | ConvertFrom-Json).version

# Read build.gradle as RAW STRING (VERY IMPORTANT)
$gradleRaw = Get-Content "android/app/build.gradle" -Raw

# Regex pattern
$applicationIdPattern = 'applicationId\s+"([^"]+)"'
$versionCodePattern    = 'versionCode\s+(\d+)'
$versionNamePattern    = 'versionName\s+"([^"]+)"'

# Match với Capture Group
$APPLICATION_ID = [regex]::Match($gradleRaw, $applicationIdPattern).Groups[1].Value
$VERSION_CODE   = [regex]::Match($gradleRaw, $versionCodePattern).Groups[1].Value
$VERSION_NAME   = [regex]::Match($gradleRaw, $versionNamePattern).Groups[1].Value

# Read APP_NAME
$xml = [xml](Get-Content "android/app/src/main/res/values/strings.xml")
$APP_NAME = $xml.resources.string.'#text'

# Create new version code
$CURRENT_DATE = Get-Date -Format "yyyyMMddHH"
$PACKAGE_NAME = "com.rncoreuisample.dev"

# Apply replacements (NO BACKTICKS – fully reliable)
$gradleNew = $gradleRaw `
  -replace '(applicationId\s+")([^"]+)(")', "`$1$PACKAGE_NAME`$3" `
  -replace '(?m)^(\s*)(?!//)(versionCode\s+)\d+', ('${1}' + 'versionCode ' + $CURRENT_DATE)

# Write updated file
[System.IO.File]::WriteAllText(
  "android/app/build.gradle",
  ($gradleNew.TrimEnd() + "`n")
)

# Read again to confirm
$gradle = Get-Content "android/app/build.gradle"

$NEW_APPLICATION_ID = [regex]::Match($gradle, $applicationIdPattern).Groups[1].Value
$NEW_VERSION_CODE   = [regex]::Match($gradle, $versionCodePattern).Groups[1].Value

Write-Host "application_id: $NEW_APPLICATION_ID"
Write-Host "version_code: $NEW_VERSION_CODE"
Write-Host "version_name: $VERSION_NAME"
Write-Host "app_name: $APP_NAME"
Write-Host "OSTYPE: Windows"
Write-Host "========= env ========="
Get-Content ".env"
