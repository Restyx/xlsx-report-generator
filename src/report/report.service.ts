import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { createReadStream, writeFileSync } from 'fs';
import { join } from 'path';
import { ReportEntity, Status } from 'src/entities/report.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import * as os from 'os';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createReport(serviceName: string, endpoint: string, headers: string[]) {
    const report = this.reportRepository.create({
      service_name: serviceName,
      endpoint: endpoint,
      headers: headers,
    });
    await this.reportRepository.save(report);
    this.generateReport(report);
    return report.id;
  }

  async generateReport(report: ReportEntity) {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get(`http://${report.service_name}${report.endpoint}`)
          .pipe(
            catchError((error: AxiosError) => {
              console.log(error.response.data);
              throw 'An error happened!';
            }),
          ),
      );

      const ws = XLSX.utils.json_to_sheet(data, { header: report.headers });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');
      const filePath = join(
        __dirname,
        `../../reports/report-${report.id}.xlsx`,
      );
      writeFileSync(
        filePath,
        XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' }),
      );

      report.status = Status.COMPLETE;

      const port = this.configService.get('SERVER_PORT');

      report.download_link = `http://localhost:${port}/reports/download/report-${report.id}.xlsx`;

      await this.reportRepository.save(report);
    } catch (error) {
      report.status = Status.FAILED;
      await this.reportRepository.save(report);
    }
  }

  async getReportStatus(id: number) {
    return this.reportRepository.findOne({ where: { id } });
  }

  downloadReport(filename: string) {
    return createReadStream(join(process.cwd(), 'reports', filename));
  }
}
