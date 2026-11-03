import { LLMProvider, AICompletionOptions } from './provider';

export class DeterministicMockLLMProvider implements LLMProvider {
  name = 'deterministic-mock';

  async complete(prompt: string, options?: AICompletionOptions): Promise<string> {
    const lower = prompt.toLowerCase();

    // 1. Red Flag / Emergency Check
    if (
      lower.includes('chest pain') ||
      lower.includes('difficulty breathing') ||
      lower.includes('shortness of breath') ||
      lower.includes('severe bleeding') ||
      lower.includes('collapsed') ||
      lower.includes('unconscious') ||
      lower.includes('coughing blood') ||
      lower.includes('stroke') ||
      lower.includes('facial drooping')
    ) {
      return JSON.stringify({
        isEmergency: true,
        emergencyEscalation: 'EMERGENCY ALERT: The symptoms you described require immediate emergency medical care. Do not wait for laboratory tests. Please dial 112 (Nigerian Emergency Services) or proceed immediately to the nearest hospital emergency department.',
        recommendedTests: []
      });
    }

    // 2. Critical Lab Value Escalation
    if (lower.includes('critical') || lower.includes('6.8 mmol/l') || lower.includes('potassium')) {
      return JSON.stringify({
        isCritical: true,
        urgency: 'HIGH',
        explanation: 'This laboratory value is in a critically elevated range that requires prompt clinical attention.',
        action: 'Please contact a doctor promptly or present to an urgent care facility for immediate clinical evaluation. Do not delay.',
        disclaimer: 'DISCLAIMER: This notification is informational only and does not replace emergency clinical assessment.'
      });
    }

    // 3. Elevated / Abnormal Non-Diagnostic Explainer
    if (lower.includes('elevated') || lower.includes('145 mg/dl') || lower.includes('diabetes?') || lower.includes('widal') || lower.includes('positive')) {
      return JSON.stringify({
        isNormal: false,
        explanation: 'Your result is above the standard reference interval.',
        whatItMeans: 'An elevated value can occur due to multiple physiological or metabolic factors. It does not on its own constitute a definitive clinical diagnosis.',
        suggestedNextSteps: 'Please discuss with your doctor to determine appropriate clinical context, follow-up testing, or dietary management.',
        disclaimer: 'DISCLAIMER: This explanation is strictly informational and does not constitute a medical diagnosis or treatment plan. Always consult a licensed medical clinician.'
      });
    }

    // 4. Normal Result Explainer
    if (lower.includes('result explainer') || lower.includes('fasting blood sugar') || lower.includes('fbs') || lower.includes('lipid')) {
      return JSON.stringify({
        testName: 'Fasting Blood Sugar (FBS)',
        patientValue: '92 mg/dL',
        referenceRange: '70 - 99 mg/dL',
        statusDescription: 'Your fasting blood sugar of 92 mg/dL is within the expected normal reference range for a healthy adult.',
        whatItMeans: 'This test measures how much glucose is in your bloodstream after an 8 to 12-hour fast. Normal values indicate that your body is managing glucose effectively.',
        suggestedNextSteps: 'Continue balanced nutrition and active lifestyle. Please discuss with your doctor during routine checkups.',
        disclaimer: 'DISCLAIMER: This explanation is informational only and does not constitute medical advice or a clinical diagnosis. Always discuss with your doctor or qualified clinician.'
      });
    }

    // 5. Smart Test Finder
    if (lower.includes('smart test finder') || lower.includes('recommend tests') || lower.includes('annual checkup') || lower.includes('general health')) {
      return JSON.stringify({
        isEmergency: false,
        summary: 'Based on your health inquiry, routine wellness screening and metabolic assessment are commonly recommended.',
        recommendedTests: [
          { code: 'FBS', name: 'Fasting Blood Sugar (FBS)', reason: 'Assesses blood glucose control after overnight fast.' },
          { code: 'HBA1C', name: 'Glycated Hemoglobin (HbA1c)', reason: 'Evaluates 3-month average blood glucose level.' },
          { code: 'LIPID', name: 'Lipid Profile', reason: 'Screens for cardiovascular and cholesterol risk.' },
          { code: 'KFT', name: 'Kidney Function Test (KFT)', reason: 'Monitors renal health and electrolyte balance.' }
        ],
        disclaimer: 'DISCLAIMER: This information is for educational and scheduling assistance only. It does not constitute a medical diagnosis. Please consult a licensed medical doctor to discuss your clinical needs.'
      });
    }

    // 6. Natural Language Search Parser
    if (lower.includes('natural-language search parser') || lower.includes('cheapest malaria test') || lower.includes('yaba')) {
      return JSON.stringify({
        query: 'malaria',
        lga: 'Lagos Mainland',
        state: 'Lagos',
        homeCollectionOnly: true,
        sortBy: 'price_asc'
      });
    }

    // 7. Result Entry Assistant (Instrument Extraction)
    if (lower.includes('result entry assistant') || lower.includes('instrument printout')) {
      return JSON.stringify({
        extractedParameters: [
          { parameterName: 'Hemoglobin', value: '14.2', unit: 'g/dL', confidence: 0.98 },
          { parameterName: 'White Blood Cell Count', value: '6.5', unit: 'x10^9/L', confidence: 0.95 },
          { parameterName: 'Platelets', value: '240', unit: 'x10^9/L', confidence: 0.96 }
        ],
        requiresHumanReview: true
      });
    }

    // 8. Anomaly and Error Checks
    if (lower.includes('anomaly') || lower.includes('extreme value')) {
      return JSON.stringify({
        hasAnomalies: true,
        warnings: [
          { parameter: 'Hemoglobin', value: '35.0', warning: 'Value is physiologically implausible (critical extreme). Likely typographical error.' }
        ]
      });
    }

    // Default Fallback
    return JSON.stringify({
      message: 'Assistive health information response.',
      disclaimer: 'DISCLAIMER: Informational only. Consult a licensed physician.'
    });
  }
}
