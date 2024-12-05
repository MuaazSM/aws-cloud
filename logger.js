const os = require('os');
const { EventLogger } = require('node-windows');

class Logger {
  constructor() {
    this.platform = os.platform();
    
    if (this.platform === 'win32') {
      this.eventLogger = new EventLogger({
        source: 'AWSAccountManager',
        eventLog: 'Application'
      });
    }
  }

  error(message, error = null) {
    const errorDetails = error ? `${message}: ${JSON.stringify(error, null, 2)}` : message;
    
    if (this.platform === 'win32') {
      // Log full error to Windows Event Log
      this.eventLogger.error(errorDetails);
      
      // Only show error name in console
      const errorName = error ? error.name || 'Error' : 'Error';
      console.error(`${errorName}: ${message}`);
    }
    /* Comment out Linux logging for now
    else if (this.platform === 'linux') {
      // TODO: Implement syslog logging
      // const Syslog = require('node-syslog');
      // Syslog.init("AWSAccountManager", Syslog.LOG_PID | Syslog.LOG_ODELAY, Syslog.LOG_LOCAL0);
      // Syslog.log(Syslog.LOG_ERROR, errorDetails);
    }
    */
    else {
      // Fallback for other operating systems
      console.error(errorDetails);
    }
  }

  info(message) {
    if (this.platform === 'win32') {
      this.eventLogger.info(message);
    }
    console.log(message);
  }
}

module.exports = new Logger();

