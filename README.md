# Hardhat TodoList


## Prerequisites
Make sure you have the following installed:

* Node.js
* npm
* Metamask browser extension

## Quick start

The first things you need to do is installing its dependencies:

```sh
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

To run tests:

```sh
npx hardhat test
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have[Metamask](https://metamask.io) installed and listening to
`localhost 8545`.
