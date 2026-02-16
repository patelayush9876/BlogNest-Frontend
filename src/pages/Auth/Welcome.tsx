import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenLine, User, Compass, ShieldCheck, Users } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

const Welcome: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm opacity-70">Preparing your experience…</div>
      </div>
    );
  }

  const steps = [
    {
      title: 'Welcome to BlogNest',
      subtitle: `Hi ${user?.name}, let’s get you started ✨`,
      icon: <User className="w-8 h-8 text-indigo-500" />,
      content: 'BlogNest is a space to write, explore ideas, and connect with thoughtful creators.',
    },
    {
      title: 'Privacy & Safety',
      subtitle: 'Your data, your control',
      icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
      content: 'We respect your privacy. Your data is never sold, and you control what you share.',
    },
    {
      title: 'Community Guidelines',
      subtitle: 'Respect makes great communities',
      icon: <Users className="w-8 h-8 text-indigo-500" />,
      content:
        'Be respectful, original, and kind. Healthy discussions make BlogNest better for everyone.',
    },
    {
      title: 'How BlogNest Works',
      subtitle: 'Create. Share. Grow.',
      icon: <PenLine className="w-8 h-8 text-indigo-500" />,
      content: 'Write blogs, follow creators, save posts, and build your audience organically.',
    },
    {
      title: 'You’re all set!',
      subtitle: 'Start your journey',
      icon: <Compass className="w-8 h-8 text-indigo-500" />,
      content: null,
    },
  ];

  const isLastStep = step === steps.length - 1;

  return (
    <div
      className={clsx(
        'min-h-screen flex items-center justify-center px-4 transition-colors duration-300',
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900',
      )}
    >
      <div
        className={clsx(
          'w-full max-w-xl min-h-[460px] rounded-2xl p-8 md:p-10 border animate-fade-in-up flex flex-col justify-between',
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
        )}
      >
        {/* Progress */}
        <div className="flex justify-between mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={clsx(
                'h-1 flex-1 mx-1 rounded-full transition',
                i <= step ? 'bg-indigo-500' : 'bg-gray-300',
              )}
            />
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">{steps[step].icon}</div>
          <h1 className="text-2xl font-bold">{steps[step].title}</h1>
          <p className="opacity-70 mt-1">{steps[step].subtitle}</p>
        </div>

        {/* Content (FIXED WIDTH + HEIGHT) */}
        <div className="mx-auto max-w-4xl min-w-lg h-[160px] flex items-center mb-8">
          {!isLastStep ? (
            <p className="text-center text-sm leading-relaxed opacity-80 w-full">
              {steps[step].content}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 mb-4 gap-6 w-full">
              <Feature
                icon={<User />}
                title="Complete your profile"
                text="Add a bio and profile picture."
              />
              <Feature
                icon={<PenLine />}
                title="Write your first blog"
                text="Share your thoughts and ideas."
              />
              <Feature
                icon={<Compass />}
                title="Explore creators"
                text="Discover content you love."
              />
              <Feature
                icon={<Users />}
                title="Build your audience"
                text="Gain followers organically."
              />
              <Feature icon={<ShieldCheck />} title="Stay safe" text="Your data stays private." />
              <Feature icon={<PenLine />} title="Save drafts" text="Write at your own pace." />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-5 py-3 rounded-full border text-sm transition hover:opacity-80"
            >
              Back
            </button>
          )}

          {!isLastStep ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 px-5 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => navigate('/user')}
              className="flex-1 px-5 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Enter BlogNest
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="flex items-start gap-3">
    <div className="shrink-0 mt-1 text-indigo-500">{icon}</div>
    <div className="flex-1">
      <h3 className="font-semibold leading-tight">{title}</h3>
      <p className="text-sm opacity-70 leading-relaxed">{text}</p>
    </div>
  </div>
);

export default Welcome;
