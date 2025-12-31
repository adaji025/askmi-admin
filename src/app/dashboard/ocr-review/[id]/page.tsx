import OCRReviewDetails from '@/components/core/dashboard/ocr-review/ocr-review-details'
import React from 'react'

const Page = () => {
  // Mock data - in production, this would be fetched based on the ID from route params
  const mockData = {
    ocrConfidence: {
      status: "Good" as const,
      percentage: 82,
    },
    performanceCheck: {
      status: "Good" as const,
      votes: 3256,
    },
    question: "What do you prefer?",
    pollOptions: [
      { label: "MacBook", votes: 3256 },
      { label: "Mac Desktop", votes: 0 },
      { label: "iPad is my computer", votes: 0 },
    ],
    screenshotDetails: {
      influencer: "@sarah_lifestyle",
      campaign: "TechCo Market Research",
      brand: "TechCo Limited",
      uploadTime: "Nov 24, 14:18 UTC",
    },
  };

  return (
    <div className="p-6">
      <OCRReviewDetails {...mockData} />
    </div>
  )
}

export default Page
