"use client";
import React, { useState } from "react";

import { walletData } from "@/constants/data";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AppButton } from "@/components/TopComp";
import Loading from "@/components/common/Loading";
import { CircleMinus, CirclePlus, Check } from "lucide-react";

import { CardSection } from "@/components/common/CardComp";
import AppModal from "@/components/AppModal";
import InputComp from "@/components/Form/InputComp";
import { BankIcon, PaypalIcon, CardIcon, BitcoinIcon } from "@/app/icons";

function StepOne({ steps, setStep }) {
  const { t: tScreen } = useTranslation("screen");
  const amountList = [10, 25, 50, 100, 200, 500];

  const bonusFirstDeposit = 5;
  const [selectedAmount, setSelectedAmount] = useState(100);

  const RowComp = ({
    label,
    value,
    color,
    labelClass = "text-[var(--textTwo)] text-md",
    valueClass = "font-normal",
  }) => (
    <div className="flex justify-between items-center">
      <div className={` ${labelClass}`}>{label}</div>
      <div className={`${valueClass}`} style={{ color }}>
        {value}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-3 ">
      <div>
        <h1 className="text-md md:text-lg  font-semibold text-[var(--textOne)]">
          {tScreen("wallet.labels.selectAmount")}
        </h1>
        <p className="text-sm md:text-base text-[var(--textTwo)]">
          {tScreen("wallet.labels.selectAmountDesc")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {amountList?.map((amount, index) => {
          return (
            <div
              onClick={() => setSelectedAmount(amount)}
              key={`amount-${index}`}
              className={`rounded-lg py-2 cursor-pointer  text-center font-semibold ${
                selectedAmount === amount
                  ? "bg-[var(--primary)] text-[var(--secondary)] "
                  : "bg-[var(--borderThree)] text-[var(--textOne)] "
              }`}
            >
              ${amount}.00
            </div>
          );
        })}
      </div>

      <InputComp
        label={tScreen("wallet.labels.customAmount")}
        type="number"
        value={selectedAmount || ""}
        onChange={(e: any) => {
          setSelectedAmount(e.target.value);
        }}
        style={{ borderRadius: 10 }}
      />

      <div className="flex flex-col gap-3 rounded-lg border border-[var(--borderOne)] bg-[var(--bgOne)] p-3">
        <RowComp
          label={tScreen("wallet.labels.amount")}
          value={`$${selectedAmount}.00`}
          color="var(--textOne)"
          valueClass="text-md font-bold"
        />
        <RowComp
          label={tScreen("wallet.labels.processingFee")}
          value={tScreen("wallet.labels.free")}
          color="var(--textThree)"
        />
        <RowComp
          label={tScreen("wallet.labels.bonusFirstDeposit")}
          value={`$${bonusFirstDeposit}.00`}
          color="var(--primary)"
        />
        <div className="w-full border border-[var(--textTwo)]" />

        <RowComp
          label={tScreen("wallet.labels.totalCredit")}
          value={`$${selectedAmount + bonusFirstDeposit}.00`}
          color="var(--primary)"
          labelClass="text-[var(--textOne)] text-lg font-semibold"
          valueClass="text-[var(--textPrimary)] text-lg font-semibold"
        />
      </div>

      <AppButton
        label={tScreen("wallet.labels.continue")}
        type="primary"
        onClick={() => setStep((prev) => Math.min(steps.length, prev + 1))}
        disabled={!selectedAmount}
        style={{
          width: "98%",
          margin: "10px auto 0",
          backgroundColor: selectedAmount
            ? "var(--primary)"
            : "var(--borderTwo)",
          border: "unset",
          color: selectedAmount ? "var(--secondary)" : "var(--textTwo)",
          cursor: selectedAmount ? "pointer" : "not-allowed",
        }}
      />
    </div>
  );
}
function StepTwo({ steps, setStep }) {
  const { t: tScreen } = useTranslation("screen");
  const iconSize = 25;

  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const paymentType = [
    {
      id: 1,
      icon: <CardIcon size={iconSize} stroke={"var(--textOne)"} />,
      title: tScreen("wallet.labels.creditDebitCard"),
      description: tScreen("wallet.labels.creditDebitCardDesc"),
    },
    {
      id: 2,
      icon: <PaypalIcon size={iconSize} />,
      title: tScreen("wallet.labels.payPal"),
      description: tScreen("wallet.labels.payPalDesc"),
    },
    {
      id: 3,
      icon: <BitcoinIcon size={iconSize} />,
      title: tScreen("wallet.labels.cryptocurrency"),
      description: tScreen("wallet.labels.cryptocurrencyDesc"),
    },
    {
      id: 4,
      icon: <BankIcon size={iconSize} />,
      title: tScreen("wallet.labels.bankTransfer"),
      description: tScreen("wallet.labels.bankTransferDesc"),
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-md md:text-lg  font-semibold text-[var(--textOne)]">
          {tScreen("wallet.labels.paymentMethod")}
        </h1>
        <p className="text-sm md:text-base text-[var(--textTwo)]">
          {tScreen("wallet.labels.paymentMethodDesc")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {paymentType?.map((paymentObj, index) => {
          const isSelected = selectedPaymentType?.id === paymentObj?.id;
          return (
            <div
              onClick={() => setSelectedPaymentType(paymentObj)}
              key={`paymentObj-${index}`}
              className={`rounded-lg py-2 cursor-pointer
                flex gap-4 p-2 items-center border-1 transition-colors duration-300
                 ${
                   isSelected
                     ? "bg-[var(--bgFive)]  border-[var(--primary)] "
                     : " border-[var(--borderFive)]"
                 }`}
            >
              <span
                className={`w-12 h-12 flex items-center justify-center rounded-full border transition-colors duration-300 ${
                  isSelected
                    ? "bg-[var(--bgTwo)]  border-[var(--primary)]"
                    : "bg-[var(--bgTwo)] border-1 border-[var(--bgTwo)]"
                }`}
              >
                {paymentObj?.icon}
              </span>

              <div className="flex-1">
                <div className="text-md text-[var(--textOne)] font-medium">
                  {paymentObj?.title}
                </div>
                <div className="text-sm text-[var(--textTwo)]">
                  {paymentObj?.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between gap-2 px-2 mt-4">
        <AppButton
          label={tScreen("wallet.labels.back")}
          type="secondary"
          onClick={() => setStep((prev) => Math.max(1, prev - 1))}
          style={{ flex: 1 }}
        />
        <AppButton
          label={tScreen("wallet.labels.continue")}
          type="primary"
          onClick={() => setStep((prev) => Math.min(steps.length, prev + 1))}
          disabled={!selectedPaymentType}
          style={{
            flex: 1,
            backgroundColor: selectedPaymentType
              ? "var(--primary)"
              : "var(--borderTwo)",
            borderColor: selectedPaymentType
              ? "var(--primary)"
              : "var(--borderTwo)",
            color: selectedPaymentType ? "var(--secondary)" : "var(--textTwo)",
            cursor: selectedPaymentType ? "pointer" : "not-allowed",
          }}
        />
      </div>
    </div>
  );
}
function StepThree({ handleClose }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div>
        <h1 className="text-md md:text-lg  mt-2 font-semibold text-[var(--textThree)]">
          Transaction Successful
        </h1>
        <p className="text-sm md:text-base text-[var(--textTwo)]">
          Screen Pending in design
        </p>
      </div>

      <AppButton
        label={"Close"}
        type="secondary"
        onClick={handleClose}
        style={{ width: "98%", margin: "10px auto 0" }}
      />
    </div>
  );
}

export function WalletAddMoneyModal({ show, onClose }) {
  const { t: tScreen } = useTranslation("screen");
  const [step, setStep] = useState(1);

  // Can dynamically change length — logic will still work
  const steps = [1, 2, 3];
  const isLastStep = step === steps.length;

  function handleClose() {
    setStep(1);
    onClose();
  }

  return (
    <AppModal
      open={show}
      onClose={handleClose}
      closeOnBackdropClick={false}
      // contClass="w-96 sm:w-[600px] max-w-2xl"
    >
      <div className="flex flex-col gap-3">
        {/* Header */}
        <h1 className="text-lg lg:text-xl font-semibold text-[var(--textOne)]">
          {tScreen("wallet.labels.addMoney")}
        </h1>

        {/* Step Indicators */}
        <div className="flex justify-center items-center">
          {steps.map((num, idx) => (
            <div key={num} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition-all duration-300 ${
                  num === step
                    ? "bg-[var(--primary)] text-black scale-110" // Only current step
                    : "bg-[var(--bgTwo)] text-[var(--textTwo)]" // Previous & next steps neutral
                }`}
              >
                {isLastStep && num === step ? (
                  <Check size={20} strokeWidth={3} />
                ) : (
                  num
                )}
              </div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div
                  className={`w-10 h-[2px] mx-2 transition-colors duration-300 ${
                    num === step ? "bg-[var(--primary)]" : "bg-[var(--textTwo)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="text-[var(--textTwo)]">
          {step === 1 && <StepOne steps={steps} setStep={setStep} />}
          {step === 2 && <StepTwo steps={steps} setStep={setStep} />}
          {step === 3 && <StepThree handleClose={handleClose} />}
        </div>
      </div>
    </AppModal>
  );
}

function WalletBalance({ walletData }) {
  const { t: tScreen } = useTranslation("screen");
  const [showWalletModal, setShowWalletModal] = useState(false);
  return (
    <>
      <WalletAddMoneyModal
        show={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />

      <div
        className={`gradient-one   border border-[var(--borderThree)]  p-4  overflow-hidden rounded-xl flex flex-col`}
      >
        <div className="flex justify-between">
          <h1 className="text-lg lg:text-xl font-semibold text-[var(--textOne)]">
            {tScreen("wallet.labels.walletBalance")}
          </h1>
          <div className=" flex gap-2  items-center w-fit px-4 py-1  bg-[var(--secondary)] border border-[var(--primary)] text-[var(--primary)] rounded-[20px]">
            <motion.div
              className="w-2 h-2 rounded-full bg-[var(--primary)]"
              animate={{
                scale: [1, 1.4, 1],
              }}
              style={{ opacity: 1 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span>{walletData?.status}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <div className="text-xl sm:text-3xl text-[var(--textOne)] font-semibold">
            {walletData?.balance}
          </div>
          <div className="text-[var(--textTwo)] text-md">
            {tScreen("wallet.labels.availableBalance")}
          </div>
          <div className="flex gap-2 mt-2">
            <AppButton
              label={tScreen("wallet.labels.addMoney")}
              type="primary"
              icon="add"
              onClick={() => setShowWalletModal(true)}
            />
            <AppButton
              label={tScreen("wallet.labels.withdrawMoney")}
              type="secondary"
              icon="withdraw"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function TransactionsFeed({ transactions }) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {transactions?.map((obj: any) => {
        const color =
          obj?.type === "debited" ? "var(--textFour)" : "var(--textThree)";
        return (
          <div
            key={obj?.id}
            className="flex gap-2 items-center rounded-lg border border-[var(--borderOne)] bg-[var(--bgOne)] p-3"
          >
            <div
              className={`rounded-full w-10 h-10 flex justify-center items-center text-[var(--secondary)] ${
                obj?.type === "debited"
                  ? "bg-[var(--textFour)]"
                  : "bg-[var(--textThree)]"
              }`}
            >
              {obj?.type === "debited" ? (
                <CircleMinus size={22} />
              ) : (
                <CirclePlus size={22} />
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-md font-semibold w-full">{obj?.title}</h1>
              <p className="text-[14px] text-[var(--textTwo)]">
                {obj?.date_time}
              </p>
            </div>
            <div>
              <h1
                className={`text-md font-semibold   w-full`}
                style={{ color: color }}
              >
                {obj?.amount}
              </h1>
              <p className="text-[14px] text-[var(--textTwo)]">{obj?.status}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function TransactionHistoryComp({ transactions }) {
  const { t: tScreen } = useTranslation("screen");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);

  const creditedData = transactions?.filter(
    (obj: any) => obj?.type === "credited"
  );
  const debitedData = transactions?.filter(
    (obj: any) => obj?.type === "debited"
  );

  const questTabs = [
    {
      key: "all",
      label: tScreen("wallet.labels.all"),
      component: <TransactionsFeed transactions={transactions || []} />,
    },
    {
      key: "credits",
      label: tScreen("wallet.labels.credits"),
      component: <TransactionsFeed transactions={creditedData || []} />,
    },
    {
      key: "debits",
      label: tScreen("wallet.labels.debits"),
      component: <TransactionsFeed transactions={debitedData || []} />,
    },
  ];

  function handleTabSwitch(tab: any) {
    setActiveTab(tab.key);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500); // 1 second delay
  }

  return (
    <div
      className={`gradient-one   border border-[var(--borderThree)]  p-4  overflow-hidden rounded-xl flex flex-col`}
    >
      <Loading loading={loading} />
      <div
        className="flex items-center
  [@media(max-width:1109px)]:flex-col    
  [@media(max-width:1109px)]:items-start 
  [@media(min-width:1110px)]:flex-row 
  [@media(min-width:1110px)]:justify-between"
      >
        <h1 className="text-lg lg:text-xl font-semibold text-[var(--textOne)]">
          {tScreen("wallet.labels.transactionHistory")}
        </h1>
        <div
          className="
          flex gap-3 sm:gap-4 
          overflow-x-auto 
          scrollbar-hide
          p-[5px]          
        "
        >
          {questTabs.map((tab) => {
            return (
              <button
                key={tab.key}
                onClick={() => handleTabSwitch(tab)}
                className={`
              cursor-pointer flex gap-1 flex-shrink-0 px-5 py-1.5
              font-medium font-semibold rounded-3xl 
              transition-colors transition-transform duration-300 ease-in-out
              hover:scale-105
              ${
                activeTab === tab.key
                  ? "bg-[var(--primary)] text-[var(--secondary)] shadow-md scale-105"
                  : "bg-[var(--borderThree)] text-[var(--textOne)] "
              }
            `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      {/* Active Tab Content  */}
      <div className="w-full">
        {questTabs.find((tab) => tab.key === activeTab)?.component}
      </div>
    </div>
  );
}

export function ExclusiveOffers({ offers }) {
  const { t: tScreen } = useTranslation("screen");

  return (
    <CardSection label={tScreen("wallet.labels.exclusiveOffers")}>
      <div className="flex flex-col gap-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="gradient-one border border-[var(--borderThree)]  p-3 border rounded-lg shadow-sm flex flex-col gap-3"
          >
            <div className="flex justify-between">
              <div className="font-semibold text-[var(--textOne)]">
                {offer.title}
              </div>
              <div className="text-[var(--primary)] font-bold">
                {offer.reward}
              </div>
            </div>
            <div className="text-[var(--textTwo)] text-sm">
              {offer.description}
            </div>
            <AppButton
              label={tScreen("wallet.labels.claimOffer")}
              onClick={() => {}}
              style={{
                backgroundColor: "var(--borderThree)",
                color: "var(--textOne)",
                border: "none",
              }}
            />
          </div>
        ))}
      </div>
    </CardSection>
  );
}

export function QuickStats({ quickStats }) {
  const { t: tScreen } = useTranslation("screen");

  const RowComp = ({ label, value, color }) => (
    <div className="flex justify-between items-center p-2 ">
      <div className="text-[var(--textTwo)] text-md ">{label}</div>
      <div className={`font-semibold`} style={{ color }}>
        {value}
      </div>
    </div>
  );

  return (
    <CardSection label={tScreen("wallet.labels.quickStats")}>
      <div className="flex flex-col ">
        <RowComp
          label={tScreen("wallet.labels.thisMonth")}
          value={quickStats.this_month}
          color="var(--primary)"
        />
        <RowComp
          label={tScreen("wallet.labels.totalEarned")}
          value={quickStats.total_earned}
          color="var(--textThree)"
        />
        <RowComp
          label={tScreen("wallet.labels.totalSpent")}
          value={quickStats.total_spent}
          color="var(--textFour)"
        />
        <RowComp
          label={tScreen("wallet.labels.netProfit")}
          value={quickStats.net_profit}
          color="var(--primary)"
        />
      </div>
    </CardSection>
  );
}

export default function WalletPage() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-4 mt-3 flex-1 ">
        <WalletBalance walletData={walletData} />
        <TransactionHistoryComp transactions={walletData?.transactionHistory} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <ExclusiveOffers offers={walletData?.offers} />
        <QuickStats quickStats={walletData?.quickStats} />
      </div>
    </div>
  );
}
