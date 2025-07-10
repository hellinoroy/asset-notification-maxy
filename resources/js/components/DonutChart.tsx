// resources/js/Components/DonutChart.tsx

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Daftarkan elemen Chart.js yang akan digunakan
ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartData {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
    }[];
}

interface DonutChartProps {
    data: ChartData;
    total: number;
}

export default function DonutChart({ data, total }: DonutChartProps) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const, // Pindahkan legenda ke kanan
                labels: {
                    boxWidth: 20,
                    padding: 15,
                    font: {
                        size: 14,
                    },
                },
            },
        },
        cutout: '70%', // Membuat lubang tengah lebih besar (donut chart)
    };

    return (
        <div className="relative flex h-48 w-full items-center justify-center">
            <Doughnut data={data} options={options} />
            <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-gray-800">{total}</span>
            </div>
        </div>
    );
}
