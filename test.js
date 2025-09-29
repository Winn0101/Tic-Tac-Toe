// Basic test file for CI/CD pipeline
const fs = require('fs');
const path = require('path');

console.log('Running basic file structure tests...');

const requiredFiles = [
  'index.html',
  'styles.css', 
  'script.js',
  'Dockerfile',
  'nginx.conf'
];

let allTestsPassed = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} is missing`);
    allTestsPassed = false;
  }
});

// Test HTML structure
const htmlContent = fs.readFileSync('index.html', 'utf8');
const htmlTests = [
  { test: htmlContent.includes('<title>Tic-Tac-Toe Game</title>'), name: 'HTML title' },
  { test: htmlContent.includes('class="game-board"'), name: 'Game board element' },
  { test: htmlContent.includes('script.js'), name: 'JavaScript file reference' },
  { test: htmlContent.includes('styles.css'), name: 'CSS file reference' }
];

htmlTests.forEach(({ test, name }) => {
  if (test) {
    console.log(`✅ ${name} test passed`);
  } else {
    console.log(`❌ ${name} test failed`);
    allTestsPassed = false;
  }
});

// Test CSS structure
const cssContent = fs.readFileSync('styles.css', 'utf8');
const cssTests = [
  { test: cssContent.includes('.game-board'), name: 'Game board styles' },
  { test: cssContent.includes('.cell'), name: 'Cell styles' },
  { test: cssContent.includes('@media'), name: 'Responsive design' }
];

cssTests.forEach(({ test, name }) => {
  if (test) {
    console.log(`✅ ${name} test passed`);
  } else {
    console.log(`❌ ${name} test failed`);
    allTestsPassed = false;
  }
});

// Test JavaScript structure
const jsContent = fs.readFileSync('script.js', 'utf8');
const jsTests = [
  { test: jsContent.includes('class TicTacToe'), name: 'TicTacToe class' },
  { test: jsContent.includes('handleCellClick'), name: 'Cell click handler' },
  { test: jsContent.includes('checkWin'), name: 'Win checking logic' }
];

jsTests.forEach(({ test, name }) => {
  if (test) {
    console.log(`✅ ${name} test passed`);
  } else {
    console.log(`❌ ${name} test failed`);
    allTestsPassed = false;
  }
});

if (allTestsPassed) {
  console.log('\n🎉 All tests passed!');
  process.exit(0);
} else {
  console.log('\n❌ Some tests failed!');
  process.exit(1);
}