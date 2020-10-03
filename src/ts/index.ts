interface IClock {
  currentTime: Date;
  setTime(d: Date): void;
}

export default class Clock implements IClock {
  currentTime = new Date();

  setTime(d: Date): void {
    this.currentTime = d;
  }

  getTime(): Date {
    return this.currentTime;
  }
}
