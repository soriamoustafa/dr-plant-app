export function extractDiagnoses(diagnosisText: string): string[] {
  if (!diagnosisText) {
    return [];
  }
  
  // Split diagnosis text into individual issues
  // Expecting format like: "Overwatering: Symptoms include.... Nutrient deficiency: Symptoms include..."
  const issues = diagnosisText.split(/\.\s+(?=[A-Z])/).filter(Boolean);
  
  // Extract the primary problem from each issue
  return issues.map(issue => {
    // Try to extract the problem name before the colon
    const match = issue.match(/^([^:]+):/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return issue.split(' ').slice(0, 3).join(' '); // Fallback to first few words
  });
}

export function getDiagnosisLevel(diagnosisText: string): 'mild' | 'moderate' | 'severe' {
  if (!diagnosisText) {
    return 'mild';
  }
  
  const lowerText = diagnosisText.toLowerCase();
  const issueCount = extractDiagnoses(diagnosisText).length;
  
  // Check for severe keywords
  if (
    lowerText.includes('severe') || 
    lowerText.includes('critical') || 
    lowerText.includes('urgent') ||
    issueCount >= 3
  ) {
    return 'severe';
  }
  
  // Check for moderate keywords
  if (
    lowerText.includes('moderate') || 
    lowerText.includes('significant') ||
    issueCount >= 2
  ) {
    return 'moderate';
  }
  
  return 'mild';
}
