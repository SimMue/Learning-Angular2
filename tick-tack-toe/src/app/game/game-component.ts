import { Component } from '@angular/core';

@Component({
    selector: 'game',
    templateUrl: './game-component.html',
    styleUrls: ['./game-component.css'],
})

export class GameComponent {
    playingFields: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    freePlayingFields: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    waitForPC: boolean = false;

    setStyle(index: number): string {
        if (index !== 0 && index % 3 === 0) {
            return "lastDiv";
        }
        return "normalDiv";
    }

    click(index: number) {
        if (!this.waitForPC && this.playingFields[index] == Occupations.Free) {
            this.playingFields[index] = Occupations.ByPlayer;
            var spliceIndex = this.freePlayingFields.indexOf(index);
            this.freePlayingFields.splice(spliceIndex, 1);
            this.startTurn();
        }
    }

    startTurn() {
        this.waitForPC = true;
        var thinkingTime = Math.floor((Math.random() * 1) + 1);
        setTimeout(() => {
            var criticalIndex = this.analyzeField();

            var freeIndex;
            var occupyIndex;
            if (criticalIndex.length === 0) {
                var randomIndex = Math.floor(Math.random() * this.freePlayingFields.length);
                freeIndex = randomIndex;
                occupyIndex = this.freePlayingFields[randomIndex];
                this.playingFields[occupyIndex] = Occupations.ByPc;
            }
            else {
                var randomIndex = Math.floor(Math.random() * criticalIndex.length);
                occupyIndex = criticalIndex[randomIndex];
                freeIndex = this.freePlayingFields.indexOf(occupyIndex);
                this.playingFields[occupyIndex] = Occupations.ByPc;
            }
            this.freePlayingFields.splice(freeIndex, 1);
            this.waitForPC = false;
        }
            , thinkingTime);
    }

    analyzeField() : number[] {
        var horizontalIndex = this.horizontalTraverse();
        var verticalIndex = this.verticalTraverse();
        var diagonalIndex = this.diagonalTransvere();

        return horizontalIndex.concat(verticalIndex, diagonalIndex);
    }

    horizontalTraverse(): number[] {
        var criticalIndex = [];
        var index = 0;

        for (var y = 0; y < 3; y++) {
            var stack = [];
            for (var x = 0; x < 3; x++) {
                if (this.playingFields[index] === Occupations.ByPc) {
                    stack = [];
                    index += 3 - x;
                    break;
                }
                if (this.playingFields[index] === Occupations.ByPlayer) {
                    stack.push(index);
                }
                index++;
            }

            if (stack.length >= 2) {
                switch (y) {
                    case 0: criticalIndex.push(this.findCriticalIndex(stack, 6)); break;
                    case 1: criticalIndex.push(this.findCriticalIndex(stack, 15)); break;
                    case 2: criticalIndex.push(this.findCriticalIndex(stack, 24)); break;
                }
            }
        }

        return criticalIndex;
    }

    verticalTraverse(): number[] {
        var criticalIndex = [];
        var index = 0;

        for (var x = 0; x < 3; x++) {
            var stack = [];
            index = x;
            for (var y = 0; y < 3; y++) {
                if (this.playingFields[index] === Occupations.ByPc) {
                    stack = [];
                    break;
                }
                if (this.playingFields[index] === Occupations.ByPlayer) {
                    stack.push(index);
                }
                index += 3;
            }

            if (stack.length >= 2) {
                switch (x) {
                    case 0: criticalIndex.push(this.findCriticalIndex(stack, 12)); break;
                    case 1: criticalIndex.push(this.findCriticalIndex(stack, 15)); break;
                    case 2: criticalIndex.push(this.findCriticalIndex(stack, 18)); break;
                }
            }
        }

        return criticalIndex;
    }

    diagonalTransvere(): number[] {
        var criticalIndex = [];       

        var stack = [];
        for (var i = 0; i < 3; i++) {
            if (this.playingFields[i * 4] === Occupations.ByPc) {
                stack = [];
                break;
            }
            if (this.playingFields[i * 4] === Occupations.ByPlayer) {
                stack.push(i * 4);
            }            
        }
        if (stack.length >= 2) {
            criticalIndex.push(this.findCriticalIndex(stack, 15));
        }

        stack = [];
        for (var i = 0; i < 3; i++) {
            if (this.playingFields[(i+1)*2] === Occupations.ByPc) {
                stack = [];
                break;
            }
            if (this.playingFields[(i+1)*2] === Occupations.ByPlayer) {
                stack.push((i+1)*2);
            }            
        }
        if (stack.length >= 2) {
            criticalIndex.push(this.findCriticalIndex(stack, 15));
        }

        return criticalIndex;
    }

    findCriticalIndex(stack: number[], max: number): number {
        var sum = 0;

        stack.forEach(element => {
            sum += element + 1;
        });

        return max - sum - 1;
    }
}

enum Occupations {
    Free = 0,
    ByPlayer = 1,
    ByPc = 2,
}