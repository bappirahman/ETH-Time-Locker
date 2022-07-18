const hre = require("hardhat");

async function main() {
  const TimeLocker = await hre.ethers.getContractFactory("TimeLocker");
  const timeLocker = await TimeLocker.deploy();

  await timeLocker.deployed();

  console.log("TimeLocker deployed to:", timeLocker.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
