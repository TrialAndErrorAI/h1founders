import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import PhoneAuth from './PhoneAuth'
import DevAdminLogin from './DevAdminLogin'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  isClaimingProfile?: boolean
  onSuccess?: () => void
}

export default function AuthModal({ isOpen, onClose, isClaimingProfile = false, onSuccess }: AuthModalProps) {
  const handleSuccess = () => {
    onSuccess?.()
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={onClose}
                    className="text-foreground-tertiary hover:text-foreground-secondary transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="terminal-text text-xs mb-2">sid@h1founders:~$ authenticate</div>
                  <div className="text-accent text-xs">
                    {isClaimingProfile 
                      ? '> Claiming existing profile from WhatsApp community...'
                      : '> Initializing secure authentication...'}
                  </div>
                </div>

                <PhoneAuth
                  onSuccess={handleSuccess}
                  isClaimingProfile={isClaimingProfile}
                />

                {/* Dev admin login for localhost only */}
                {window.location.hostname === 'localhost' && (
                  <DevAdminLogin onSuccess={handleSuccess} />
                )}

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-foreground-tertiary text-center">
                    By continuing, you agree to our community guidelines and privacy policy.
                    Your phone number is encrypted and never shared.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}