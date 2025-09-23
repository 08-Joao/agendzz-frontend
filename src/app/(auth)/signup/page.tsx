'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Eye, EyeClosed, Letter, Lock, Phone, User, ArrowLeft, ArrowRight } from '@solar-icons/react/ssr'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Signup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  // Função para validar senha
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8
    const hasLowercase = /[a-z]/.test(password)
    const hasUppercase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    return {
      minLength,
      hasLowercase,
      hasUppercase,
      hasNumber,
      hasSymbol,
      isValid: minLength && hasLowercase && hasUppercase && hasNumber && hasSymbol
    }
  }

  const passwordValidation = validatePassword(password)
  const isPasswordMatch = password === confirmPassword && confirmPassword !== ''

  // Validações por etapa
  const isStep1Valid = name.trim() !== '' && email.trim() !== ''
  const isStep2Valid = phone.trim() !== '' && birthDate.trim() !== ''
  const isStep3Valid = passwordValidation.isValid && isPasswordMatch && acceptTerms

  const canProceedToNext = () => {
    if (currentStep === 1) return isStep1Valid
    if (currentStep === 2) return isStep2Valid
    return false
  }

  const canFinish = () => {
    return isStep1Valid && isStep2Valid && isStep3Valid
  }

  const nextStep = () => {
    if (canProceedToNext() && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const router = useRouter()

  const renderStepIndicator = () => (
    <div className="flex justify-center items-center space-x-2 mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${
            step === currentStep 
              ? 'border-primary bg-primary text-primary-foreground' 
              : step < currentStep 
                ? 'border-green-500 bg-green-500 text-white'
                : 'border-muted-foreground bg-transparent text-muted-foreground'
          }`}>
            {step < currentStep ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className="text-sm font-semibold">{step}</span>
            )}
          </div>
          {step < 3 && (
            <div className={`w-8 h-0.5 transition-all duration-200 ${
              step < currentStep ? 'bg-green-500' : 'bg-muted-foreground'
            }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className='text-2xl font-bold text-foreground mb-2'>Informações Básicas</h2>
        <p className='text-muted-foreground'>Vamos começar com seus dados pessoais</p>
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Nome Completo</label>
        <div className="relative">
          <User weight='BoldDuotone' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            type="text"
            placeholder="Digite seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 h-12 border-border focus:border-primary focus:ring-primary rounded-xl"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Email</label>
        <div className="relative">
          <Letter weight='BoldDuotone' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12 border-border focus:border-primary focus:ring-primary rounded-xl"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className='text-2xl font-bold text-foreground mb-2'>Dados de Contato</h2>
        <p className='text-muted-foreground'>Precisamos de algumas informações adicionais</p>
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Telefone</label>
        <div className="relative">
          <Phone weight='BoldDuotone' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            type="tel"
            placeholder="(99) 98888-8888"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-10 h-12 border-border focus:border-primary focus:ring-primary rounded-xl"
          />
        </div>
      </div>

      {/* Birth Date Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Data de Nascimento</label>
        <div className="relative">
          <Calendar weight='BoldDuotone' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="pl-10 h-12 border-border focus:border-primary focus:ring-primary rounded-xl"
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className='text-2xl font-bold text-foreground mb-2'>Segurança</h2>
        <p className='text-muted-foreground'>Crie uma senha segura para sua conta</p>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Senha</label>
        <div className="relative">
          <Lock weight='BoldDuotone' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 h-12 border-border focus:border-primary focus:ring-primary rounded-xl"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <Eye weight='BoldDuotone' className="w-5 h-5" /> : <EyeClosed weight='BoldDuotone' className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Confirmar Senha</label>
        <div className="relative">
          <Lock weight='BoldDuotone' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            type={showPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`pl-10 h-12 border-border focus:border-primary focus:ring-primary rounded-xl ${
              confirmPassword && !isPasswordMatch ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          />
        </div>
        {confirmPassword && !isPasswordMatch && (
          <p className="text-sm text-red-500">As senhas não coincidem</p>
        )}
      </div>

      {/* Password Requirements */}
      {password && (
        <div className="bg-muted/50 rounded-xl p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Requisitos da senha:</p>
          <div className="grid grid-cols-1 gap-2">
            <div className={`flex items-center space-x-2 text-sm ${passwordValidation.minLength ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-2 h-2 rounded-full ${passwordValidation.minLength ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
              <span>Mínimo 8 caracteres</span>
            </div>
            <div className={`flex items-center space-x-2 text-sm ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-2 h-2 rounded-full ${passwordValidation.hasLowercase ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
              <span>Pelo menos uma letra minúscula</span>
            </div>
            <div className={`flex items-center space-x-2 text-sm ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-2 h-2 rounded-full ${passwordValidation.hasUppercase ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
              <span>Pelo menos uma letra maiúscula</span>
            </div>
            <div className={`flex items-center space-x-2 text-sm ${passwordValidation.hasNumber ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-2 h-2 rounded-full ${passwordValidation.hasNumber ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
              <span>Pelo menos um número</span>
            </div>
            <div className={`flex items-center space-x-2 text-sm ${passwordValidation.hasSymbol ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-2 h-2 rounded-full ${passwordValidation.hasSymbol ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
              <span>Pelo menos um símbolo especial</span>
            </div>
          </div>
        </div>
      )}

      {/* Terms and conditions */}
      <div className="flex items-start space-x-2">
        <input 
          type="checkbox" 
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-0.5"
        />
        <span className="text-sm text-muted-foreground">
          Aceito os{' '}
          <a href="#" className="text-primary hover:text-primary/80 font-medium">
            Termos de Uso
          </a>
          {' '}e{' '}
          <a href="#" className="text-primary hover:text-primary/80 font-medium">
            Política de Privacidade
          </a>
        </span>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-primary/5 via-accent/5 to-chart-3/5 flex items-center justify-center p-4'>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100/50 dark:bg-grid-slate-800/30 opacity-60"></div>
      
      {/* Floating Container */}
      <div className="relative bg-card backdrop-blur-xl rounded-3xl shadow-2xl border border-border/20 p-8 w-full max-w-md mx-auto">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-chart-3/5 rounded-3xl"></div>
        
        <div className="relative z-10">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-primary-foreground"
              >
                <path 
                  d="M12 2L2 7L12 12L22 7L12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 17L12 22L22 17" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 12L12 17L22 12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className='text-3xl font-bold text-foreground mb-2'>Junte-se a nós</h1>
            <p className='text-muted-foreground'>Etapa {currentStep} de 3</p>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Step Content */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <Button 
                onClick={prevStep}
                variant="outline"
                className="flex-1 h-12 border-border hover:bg-secondary rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
            )}
            
            {currentStep < 3 ? (
              <Button 
                onClick={nextStep}
                disabled={!canProceedToNext()}
                className={`${currentStep === 1 ? 'w-full' : 'flex-1'} h-12 font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                  canProceedToNext()
                    ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground hover:shadow-xl' 
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                disabled={!canFinish()}
                className={`flex-1 h-12 font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                  canFinish()
                    ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground hover:shadow-xl' 
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                Cadastrar
              </Button>
            )}
          </div>

          {/* Social Login - Apenas na primeira etapa */}
          {currentStep === 1 && (
            <>
              {/* Divider */}
              <div className="relative flex items-center justify-center my-6">
                <div className="w-[30%] border-t border-border"></div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 text-muted-foreground">ou continue com</span>
                </div>
                <div className="w-[30%] border-t border-border"></div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button 
                  variant="outline" 
                  className="h-12 border-border hover:bg-secondary rounded-xl"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 border-border hover:bg-secondary rounded-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </>
          )}

          {/* Sign in link */}
          <div className="flex justify-center items-center gap-1 mt-6">
            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?
            </p>
            <button onClick={() => router.push("/signin")} className="text-primary hover:text-primary/80 font-medium">
              Entre aqui
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup