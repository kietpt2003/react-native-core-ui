#! /usr/bin/env bash

# Change env to production
cat .env.production > .env;

# Ensure react-native-config reads correct env
echo ".env.production" > /tmp/envfile

# Change .json google-service
# cat documents/google-services/google-services-pro.json > android/app/google-services.json;
# cat documents/google-services/google-services-pro.plist > ios/GoogleService-Info.plist;

cat <<END >android/app/src/main/res/values/strings.xml
<resources>
    <string name="app_name" translatable="false">Estuary Core UI</string>
</resources>
END

# Auto open files in VS Code
code -r package.json;
code -r .env;
code -r android/app/build.gradle;
code -r android/app/src/main/res/values/strings.xml;
# code -r android/app/google-services.json;

# Extract current package info
PACKAGE_VERSION=$(grep -m1 version package.json | awk -F: '{print $2}' | tr -d '", ')

VERSION_NAME=$(grep -m1 'versionName' android/app/build.gradle | sed -E 's/versionName[ \t]*"(.*)"/\1/')

APP_NAME=$(grep -m1 app_name android/app/src/main/res/values/strings.xml | awk -F'[<>]' '{print $3}' | tr -d ' ')

CURRENT_DATE=$(date +'%Y%m%d%H')
PACKAGE_NAME="com.rncoreuisample"

# Update build.gradle inside defaultConfig
awk -v newAppId="$PACKAGE_NAME" -v newVersionCode="$CURRENT_DATE" '
  BEGIN {inDefaultConfig=0}
  /defaultConfig[ \t]*{/ {inDefaultConfig=1; print; next}
  inDefaultConfig && /applicationId/ {gsub(/".*"/, "\""newAppId"\""); print; next}
  inDefaultConfig && /versionCode/ {gsub(/[0-9]+/, newVersionCode); print; next}
  /}/ && inDefaultConfig {inDefaultConfig=0; print; next}
  {print}
' android/app/build.gradle > android/app/build.gradle.tmp

mv android/app/build.gradle.tmp android/app/build.gradle

# Print summary
echo "application_id:" $PACKAGE_NAME
echo "version_code:" $CURRENT_DATE
echo "version_name:" $VERSION_NAME
echo "app_name:" $APP_NAME
echo "OSTYPE:" $OSTYPE
echo "========= env ========="
cat .env
echo
