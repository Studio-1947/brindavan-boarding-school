'use client';

import { useState, type FormEvent } from 'react';
import { useT } from '@/i18n/ui';

const ACCESS_KEY = '365f8586-3251-4470-9ac3-ef8a4f3ccb9f';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

/** Sends admission enquiries directly to the school's Web3Forms inbox. */
export function AdmissionForm() {
  const t = useT();
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setSubmissionState('submitting');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) throw new Error('Submission failed');

      form.reset();
      setSubmissionState('success');
    } catch {
      setSubmissionState('error');
    }
  };

  return (
    <form className="admission-form" onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New admission enquiry — Brindavan Boarding School" />
      <input className="admission-form-botcheck" type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" />

      <div className="admission-form-grid">
        <label>
          {t("Student's name")}
          <input type="text" name="student_name" autoComplete="name" required />
        </label>
        <label>
          {t("Father's name")}
          <input type="text" name="father_name" required />
        </label>
        <label>
          {t("Mother's name")}
          <input type="text" name="mother_name" required />
        </label>
        <label>
          {t('Date of birth')}
          <input type="date" name="date_of_birth" required />
        </label>
        <label>
          {t('Gender')}
          <select name="gender" defaultValue="" required>
            <option value="" disabled>
              {t('Select gender')}
            </option>
            <option value="Female">{t('Female')}</option>
            <option value="Male">{t('Male')}</option>
            <option value="Prefer not to say">{t('Prefer not to say')}</option>
          </select>
        </label>
        <label>
          {t('Mobile number')}
          <input type="tel" name="mobile" autoComplete="tel" inputMode="tel" required />
        </label>
        <label>
          {t('Class to be admitted in')}
          <select name="admission_class" defaultValue="" required>
            <option value="" disabled>
              {t('Select a class')}
            </option>
            <option value="Nursery">Nursery</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            {Array.from({ length: 12 }, (_, index) => {
              const className = `Class ${index + 1}`;
              return (
                <option key={className} value={className}>
                  {t(className)}
                </option>
              );
            })}
          </select>
        </label>
        <fieldset>
          <legend>{t('Is boarding required?')}</legend>
          <div className="admission-form-options">
            <label>
              <input type="radio" name="boarding_required" value="Yes" required />
              {t('Yes')}
            </label>
            <label>
              <input type="radio" name="boarding_required" value="No" required />
              {t('No')}
            </label>
          </div>
        </fieldset>
        <label className="admission-form-full">
          {t('Address')}
          <textarea name="address" rows={4} autoComplete="street-address" required />
        </label>
        <label>
          {t('Pincode')}
          <input type="text" name="pincode" autoComplete="postal-code" inputMode="numeric" required />
        </label>
      </div>

      <p className="admission-form-note">
        {t('This form sends an admission enquiry to the school. It does not confirm admission or a place.')}
      </p>
      <button className="button admission-form-submit" type="submit" disabled={submissionState === 'submitting'}>
        {submissionState === 'submitting' ? t('Sending…') : t('Send admission enquiry')}
      </button>
      {submissionState === 'success' && (
        <p className="admission-form-message is-success" role="status">
          {t('Thank you. Your admission enquiry has been sent.')}
        </p>
      )}
      {submissionState === 'error' && (
        <p className="admission-form-message is-error" role="alert">
          {t('We could not send your enquiry. Please try again or contact the school directly.')}
        </p>
      )}
    </form>
  );
}
