import { Module } from '@nestjs/common';
import { moduleFactory } from '@onivoro/server-common';
import { TwilioService } from './services/twilio.service';
import { ServerTwilioConfig } from './classes/server-twilio-config.class';
import { Twilio } from 'twilio';

@Module({})
export class ServerTwilioModule {
  static configure(config: ServerTwilioConfig) {
    const twilio = new Twilio(
      config.TWILIO_ACCOUNT_SID,
      config.TWILIO_AUTH_TOKEN,
    );
    return moduleFactory({
      module: ServerTwilioModule,
      providers: [
        {
          provide: TwilioService,
          useFactory: () => new TwilioService(
            config,
            twilio
          )
        },
        {
          provide: Twilio,
          useValue: twilio
        }
      ]
    });
  }
}
