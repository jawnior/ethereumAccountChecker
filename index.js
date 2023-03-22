const web3 = new Web3(`https://mainnet.infura.io/v3/${key.apiKey}`);

const textarea = document.getElementById('textarea');
const button = document.getElementById('button');
const resetButton = document.getElementById('reset-button')
const numberOutput = document.getElementById('number');
const balanceOutput = document.getElementById('balance');

button.addEventListener('click', async () => {
    const addressHexString = textarea.value.trim();
    const isAddress = await web3.utils.isAddress(addressHexString);

    if (isAddress) {
        const number = await web3.eth.getTransactionCount(addressHexString);
        const balanceInWei = await web3.eth.getBalance(addressHexString);
        const balanceToEther = await web3.utils.fromWei(balanceInWei, 'ether');

        resetButton.style.display = 'inline-block';
        numberOutput.innerHTML = `Number of transactions sent: ${number}`;
        balanceOutput.innerHTML = `Balance: ${balanceToEther} ETH`;
    } else {
        resetButton.style.display = 'inline-block';
        numberOutput.innerHTML = 'This address is not correct.';
        balanceOutput.innerHTML = '';
    }
});

resetButton.addEventListener('click', () => {
    textarea.value = '';
    resetButton.style.display = 'none';
    numberOutput.innerHTML = '';
    balanceOutput.innerHTML = '';
})
