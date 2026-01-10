import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceCommandPanel = ({ onVoiceCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [lastCommand, setLastCommand] = useState('');

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setLastCommand('Listening...');
      setTimeout(() => {
        const mockCommands = [
          'Status update: En route',
          'Navigate to destination',
          'Call customer',
          'Report delay',
        ];
        const randomCommand = mockCommands?.[Math.floor(Math.random() * mockCommands?.length)];
        setLastCommand(randomCommand);
        setIsListening(false);
        if (onVoiceCommand) {
          onVoiceCommand(randomCommand);
        }
      }, 2000);
    }
  };

  const quickCommands = [
    { label: 'Update Status', command: 'status', icon: 'CheckCircle' },
    { label: 'Navigate', command: 'navigate', icon: 'Navigation' },
    { label: 'Call Support', command: 'call', icon: 'Phone' },
    { label: 'Report Issue', command: 'report', icon: 'AlertCircle' },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-4 md:p-6 shadow-glow-md">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Icon name="Mic" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Voice Commands</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Hands-free control</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedLanguage('english')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors ${
              selectedLanguage === 'english' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setSelectedLanguage('hindi')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-colors ${
              selectedLanguage === 'hindi' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-6 mb-4 md:mb-6">
        <button
          onClick={handleVoiceToggle}
          className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening
              ? 'bg-error shadow-glow-lg animate-pulse'
              : 'bg-primary hover:bg-primary/90 shadow-glow-md'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          <Icon
            name={isListening ? 'MicOff' : 'Mic'}
            size={32}
            color="white"
          />
        </button>

        {lastCommand && (
          <div className="w-full p-3 md:p-4 bg-muted/50 rounded-xl text-center">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">
              {isListening ? 'Listening...' : 'Last Command'}
            </p>
            <p className="text-sm md:text-base font-medium text-foreground">{lastCommand}</p>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <p className="text-xs md:text-sm font-medium text-muted-foreground">Quick Commands</p>
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {quickCommands?.map((cmd) => (
            <Button
              key={cmd?.command}
              variant="outline"
              size="sm"
              iconName={cmd?.icon}
              iconPosition="left"
              onClick={() => {
                setLastCommand(cmd?.label);
                if (onVoiceCommand) {
                  onVoiceCommand(cmd?.command);
                }
              }}
              className="justify-start"
            >
              {cmd?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-primary/5 rounded-xl border border-primary/20">
        <div className="flex items-start gap-2 md:gap-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs md:text-sm text-foreground font-medium mb-1">Voice Command Tips</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Say "Update status" to change delivery status</li>
              <li>• Say "Navigate" to start turn-by-turn directions</li>
              <li>• Say "Call customer" to contact recipient</li>
              <li>• Say "Report delay" to notify dispatch</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommandPanel;