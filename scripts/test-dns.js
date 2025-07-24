import { lookup } from 'dns';
import { promisify } from 'util';

const lookupAsync = promisify(lookup);

async function testDNS() {
  console.log('🧪 Testing DNS Resolution...\n');
  
  const hostname = 'badgers-shopping-list-server.database.windows.net';
  
  try {
    console.log(`🔍 Resolving ${hostname} using Node.js DNS...`);
    const result = await lookupAsync(hostname);
    console.log(`✅ Success! Resolved to: ${result.address} (family: IPv${result.family})`);
  } catch (error) {
    console.log(`❌ Node.js DNS resolution failed: ${error.message}`);
    console.log(`   Error code: ${error.code}`);
    
    // Try with different options
    try {
      console.log('\n🔄 Trying with all addresses...');
      const allResults = await lookupAsync(hostname, { all: true });
      console.log(`✅ Success! Found ${allResults.length} addresses:`);
      allResults.forEach((addr, i) => {
        console.log(`   ${i + 1}. ${addr.address} (IPv${addr.family})`);
      });
    } catch (allError) {
      console.log(`❌ All addresses lookup also failed: ${allError.message}`);
    }
  }
}

testDNS().catch(console.error);
