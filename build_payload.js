
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
    console.log('Compiling remote payload zip...');
    // Create temporary zip command
    // We use zip command if available, or just suggest user to zip the folder
    if (fs.existsSync('./remote_payload.zip')) {
        fs.unlinkSync('./remote_payload.zip');
    }
    
    // Check if zip command exists
    try {
        execSync('zip -r remote_payload.zip remote_server', { stdio: 'inherit' });
        console.log('Successfully created remote_payload.zip');
    } catch (e) {
        console.error('Could not create zip automatically. Please manually zip the remote_server folder.');
    }
} catch (error) {
    console.error('Error:', error);
}
