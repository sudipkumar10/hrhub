-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "razorpayCustomerId" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "razorpayCustomerId" TEXT;

-- CreateTable
CREATE TABLE "subscription" (
    "id" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "razorpayCustomerId" TEXT,
    "razorpaySubscriptionId" TEXT,
    "razorpayPlanId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'created',
    "currentStart" TIMESTAMP(3),
    "currentEnd" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "quantity" INTEGER DEFAULT 1,
    "totalCount" INTEGER,
    "paidCount" INTEGER DEFAULT 0,
    "remainingCount" INTEGER,
    "cancelledAt" TIMESTAMP(3),
    "pausedAt" TIMESTAMP(3),
    "shortUrl" TEXT,
    "cancelAtCycleEnd" BOOLEAN DEFAULT false,
    "billingPeriod" TEXT,
    "trialStart" TIMESTAMP(3),
    "trialEnd" TIMESTAMP(3),
    "metadata" TEXT,
    "renewedAt" TIMESTAMP(3),

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);
