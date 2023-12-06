import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  constructor(@Inject('MS_SERVICE') private readonly mSClient: ClientProxy) {}

  endpoint = process.env.S3_API_ENDPOINT;
  bucket = process.env.S3_BUCKET_NAME;
  accessKey = process.env.S3_ACCESS_KEY;
  secretKey = process.env.S3_SECRET_KEY;

  s3 = new AWS.S3({
    accessKeyId: this.accessKey,
    secretAccessKey: this.secretKey,
    endpoint: this.endpoint,
  });

  async getAll() {
    const params = {
      Bucket: this.bucket,
      MaxKeys: 2,
    };
    this.s3.listObjectsV2(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  }

  async getListBuckets() {
    return new Promise((resolve, rejects) => {
      this.s3.listBuckets((err, data) => {
        if (err) rejects(err);
        else resolve(data);
      });
    });
  }

  async getListFileByBucketName() {
    const params = {
      Bucket: this.bucket,
      MaxKeys: 10,
    };
    return new Promise((resolve, reject) => {
      this.s3.listObjectsV2(params, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  async uploadFileToS3(file: Express.Multer.File) {
    const fileName = this.genFileName(file.originalname);
    const params = {
      Bucket: this.bucket,
      Key: `GTCC/${process.env.NODE_ENV}/${fileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  private genFileName(originName: string): string {
    const min = 1;
    const max = 100;
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${randomInteger}-${Date.now()}-${originName}`;
  }

  // update policy bucket to public file
  async updatePolicyBucket() {
    const policyPdefinition = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'PublicRead',
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: ['arn:aws:s3:::bitecco', 'arn:aws:s3:::bitecco/*'],
        },
      ],
    };
    const params = {
      Bucket: this.bucket,
      Policy: JSON.stringify(policyPdefinition),
    };
    this.s3.putBucketPolicy(params);
  }
}
