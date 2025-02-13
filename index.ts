```typescript
// BasicDataProcessing.ts

import * as fs from 'fs';
import * as path from 'path';

interface DataItem {
    id: number;
    name: string;
    value: number;
}

class BasicDataProcessing {
    private rawData: Array<DataItem>;

    constructor() {
        this.rawData = [];
    }

    public loadDataFromFile(filePath: string): void {
        const absolutePath = path.resolve(filePath);
        const fileContent = fs.readFileSync(absolutePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);
        this.rawData = jsonData.data;
    }

    public filterDataByValue(minValue: number): Array<DataItem> {
        return this.rawData.filter(item => item.value >= minValue);
    }

    public sortDataByName(): Array<DataItem> {
        return this.rawData.sort((a, b) => a.name.localeCompare(b.name));
    }

    public groupDataByName(): { [key: string]: Array<DataItem> } {
        return this.rawData.reduce((acc, item) => {
            if (!acc[item.name]) {
                acc[item.name] = [];
            }
            acc[item.name].push(item);
            return acc;
        }, {} as { [key: string]: Array<DataItem> });
    }

    public calculateAverageValue(): number {
        if (this.rawData.length === 0) {
            return 0;
        }

        const total = this.rawData.reduce((acc, item) => acc + item.value, 0);
        return total / this.rawData.length;
    }

    public findMinValue(): number {
        return this.rawData.reduce((min, item) => item.value < min ? item.value : min, this.rawData[0].value);
    }

    public findMaxValue(): number {
        return this.rawData.reduce((max, item) => item.value > max ? item.value : max, this.rawData[0].value);
    }

    public exportDataToFile(filePath: string, data: Array<DataItem> | { [key: string]: Array<DataItem> }): void {
        const absolutePath = path.resolve(filePath);
        const jsonData = JSON.stringify({ data });
        fs.writeFileSync(absolutePath, jsonData, 'utf-8');
    }
}

// Usage

const dataProcessor = new BasicDataProcessing();

dataProcessor.loadDataFromFile('./data.json');

const filteredData = dataProcessor.filterDataByValue(10);
console.log('Filtered data:', filteredData);

const sortedData = dataProcessor.sortDataByName();
console.log('Sorted data:', sortedData);

const groupedData = dataProcessor.groupDataByName();
console.log('Grouped data:', groupedData);

const avgValue = dataProcessor.calculateAverageValue();
console.log('Average value:', avgValue);

const minValue = dataProcessor.findMinValue();
console.log('Min value:', minValue);

const maxValue = dataProcessor.findMaxValue();
console.log('Max value:', maxValue);

dataProcessor.exportDataToFile('./filteredData.json', filteredData);
dataProcessor.exportDataToFile('./sortedData.json', sortedData);
dataProcessor.exportDataToFile('./groupedData.json', groupedData);
```
Цей код виконує базову обробку даних у TypeScript, включаючи завантаження даних з файлу, фільтрацію, сортування, групування, розрахунок середнього значення, пошук мінімального та максимального значення та експорт даних до файлу.