// connects to the Web3 node
const web3 = new Web3(`https://mainnet.infura.io/v3/${key.apiKey}`);

// declares variables of HTML Ids
const textarea = document.getElementById('textarea');
const button = document.getElementById('button');
const resetButton = document.getElementById('reset-button')
const numberOutput = document.getElementById('number');
const balanceOutput = document.getElementById('balance');

button.addEventListener('click', async () => {
    // trims the input
    const addressHexString = textarea.value.trim();
    // checks if the input is valid Ethereum address
    const isAddress = await web3.utils.isAddress(addressHexString);

    if (isAddress) {
        // gets the number of transactions sent
        const number = await web3.eth.getTransactionCount(addressHexString);
        // gets balance in Wei
        const balanceInWei = await web3.eth.getBalance(addressHexString);
        // converts balance to Ether
        const balanceToEther = await web3.utils.fromWei(balanceInWei, 'ether');
        // displays reset button, number of transactions and balance
        resetButton.style.display = 'inline-block';
        numberOutput.innerHTML = `Number of transactions sent: ${number}`;
        balanceOutput.innerHTML = `Balance: ${balanceToEther} ETH`;
    } else {
        // displays reset button, unvalid address information and empty balance string
        resetButton.style.display = 'inline-block';
        numberOutput.innerHTML = 'This address is not correct.';
        balanceOutput.innerHTML = '';
    }
});

resetButton.addEventListener('click', () => {
    // resets strings and the button to the first state
    textarea.value = '';
    resetButton.style.display = 'none';
    numberOutput.innerHTML = '';
    balanceOutput.innerHTML = '';
})
