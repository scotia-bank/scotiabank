#!/bin/bash

# ──────────────────────────────────────────────────────────────────────────
#  SARAH-OS REMOTE PHP DEPLOYER
#  This script packages the remote PHP server files for deployment.
# ──────────────────────────────────────────────────────────────────────────

set -e

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 SARAH-OS: Preparing Remote PHP Payload...${NC}"

# Check if remote_server directory exists
if [ ! -d "remote_server" ]; then
    echo -e "${RED}❌ Error: 'remote_server' directory not found!${NC}"
    exit 1
fi

# Create zip archive
echo -e "${YELLOW}📦 Compressing files...${NC}"
# Note: we zip the contents of the remote_server folder, not the folder itself
cd remote_server
zip -r ../remote_payload.zip ./* -x "README.md"
cd ..

echo -e "${GREEN}✅ Success! 'remote_payload.zip' has been created in the root directory.${NC}"
echo ""
echo -e "${BLUE}📋 NEXT STEPS FOR DEPLOYMENT:${NC}"
echo -e "1. ${YELLOW}Download${NC} 'remote_payload.zip' from this editor's file explorer."
echo -e "2. ${YELLOW}Upload${NC} it to your remote PHP hosting (cPanel, Render, or a high-reputation domain)."
echo -e "3. ${YELLOW}Extract${NC} the contents directly into your public webroot (e.g., /public_html/ or /var/www/html/)."
echo -e "4. ${YELLOW}Configure${NC} your app settings:"
echo -e "   - Log in as Admin (${YELLOW}PROJECTSARAH${NC})"
echo -e "   - Go to ${BLUE}Admin Panel -> Settings -> Core${NC}"
echo -e "   - Set ${GREEN}Base Action URL${NC} to your remote domain (e.g., ${BLUE}https://your-domain.com${NC})"
echo -e "5. ${YELLOW}Save Settings${NC}."
echo ""
echo -e "${GREEN}✨ Once configured, the TSX frontend will hit your PHP server directly for bulletproof email delivery!${NC}"
echo ""
