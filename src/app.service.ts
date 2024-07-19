import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): string {
    return "I'm gonna be optimistic about this... [Pompeli] - Bastile";
  }
}
