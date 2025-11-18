// Simple test script to verify the application setup
console.log('Testing Apna Dabba Application...');

// Test if all required files exist
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'src/App.tsx',
  'src/services/api.ts',
  'src/services/mockData.ts',
  'src/services/authService.ts',
  'src/services/menuService.ts',
  'src/components/student/StudentDashboard.tsx',
  'src/components/shared/UnifiedBottomTab.tsx'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n🎉 All required files are present!');
  console.log('📱 The application is ready with comprehensive mock data');
  console.log('🚀 Run "npm run dev" to start the development server');
} else {
  console.log('\n❌ Some files are missing. Please check the setup.');
}