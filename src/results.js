class Results {

  static SHAPE_SCORE = 1;
  static LINES_SCORE = [10, 20, 40, 100];

  constructor() {
    this.currentScore = 0;
    this.bestScores = [0,0,0];
    if  (typeof this.bestScores === 'undefined' || this.bestScores === null) {
      this.bestScores = [0,0,0];
    }
  }

  /*
   * Score for single element
   */
  addElement() {
    this.currentScore += Results.SHAPE_SCORE;
  }

  /*
   * Score for lines
   */
  addLine(numberOfLines) {
    this.currentScore += Results.LINES_SCORE[numberOfLines - 1];
  }

  storeBestScore() {
    let i;
    const resultsLength = this.bestScores.length -1;
    for (i=0; i < resultsLength; i++) {
      if (this.currentScore > this.bestScores[i]) {
        this.bestScores[i] = this.currentScore;
        return
      }
    }
  }

  reset() {
    this.currentScore = 0;
  }
}

export default Results