import { Request, Response } from 'express'

import s3DeleteFile from '../lib/s3/s3-delete-file'
import s3GetSignedURL from '../lib/s3/s3-get-signed-url'
import s3UploadFile from '../lib/s3/s3-upload-file'

export const S3UploadController = async (req: Request, res: Response) => {
  const bucketName = req.body?.bucketName
  const bucketRegion = req.body?.bucketRegion
  const bucketAccessKeyId = req.body?.bucketAccessKeyId
  const bucketSecretAccessKey = req.body?.bucketSecretAccessKey
  const file: any = req?.file

  if (!bucketName) {
    res.send({
      error: 'Bucket name is required.',
    })
  } else if (!bucketRegion) {
    res.send({
      error: 'Bucket region is required.',
    })
  } else if (!bucketAccessKeyId) {
    res.send({
      error: 'Bucket access key ID is required.',
    })
  } else if (!bucketSecretAccessKey) {
    res.send({
      error: 'Bucket secret access key is required.',
    })
  } else if (!file) {
    res.send({
      error: 'File is required.',
    })
  } else {
    try {
      const s3Object = await s3UploadFile({
        bucketName: bucketName,
        bucketRegion: bucketRegion,
        bucketAccessKeyId: bucketAccessKeyId,
        bucketSecretAccessKey: bucketSecretAccessKey,
        fileBuffer: file.buffer,
        fileEncoding: file.encoding,
        fileName: file.originalname,
        fileContentType: file.mimetype!,
      })

      const s3ObjectURL = await s3GetSignedURL({
        bucketName: bucketName,
        bucketRegion: bucketRegion,
        bucketAccessKeyId: bucketAccessKeyId,
        bucketSecretAccessKey: bucketSecretAccessKey,
        key: s3Object.Key,
      })

      res.send({
        statusCode: 200,
        key: s3Object.Key,
        url: s3ObjectURL,
      })
    } catch (error) {
      res.send({
        statusCode: 500,
        error: `${error}`,
      })
    }
  }
}

export const S3GetSignedURL = async (req: Request, res: Response) => {
  const bucketName: any = req.query?.bucketName
  const bucketRegion: any = req.query?.bucketRegion
  const bucketAccessKeyId: any = req.query?.bucketAccessKeyId
  const bucketSecretAccessKey: any = req.query?.bucketSecretAccessKey
  const key: any = req.query?.key

  if (!bucketName) {
    res.send({
      error: 'Bucket name is required.',
    })
  } else if (!bucketRegion) {
    res.send({
      error: 'Bucket region is required.',
    })
  } else if (!bucketAccessKeyId) {
    res.send({
      error: 'Bucket access key ID is required.',
    })
  } else if (!bucketSecretAccessKey) {
    res.send({
      error: 'Bucket secret access key is required.',
    })
  } else if (!key) {
    res.send({
      error: 'Key is required.',
    })
  } else {
    try {
      const s3ObjectURL = await s3GetSignedURL({
        bucketName: bucketName,
        bucketRegion: bucketRegion,
        bucketAccessKeyId: bucketAccessKeyId,
        bucketSecretAccessKey: bucketSecretAccessKey,
        key: key,
      })

      res.send({
        statusCode: 200,
        key: s3ObjectURL,
      })
    } catch (error) {
      res.send({
        statusCode: 500,
        error: `${error}`,
      })
    }
  }
}

export const S3DeleteFile = async (req: Request, res: Response) => {
  const bucketName: any = req.body?.bucketName
  const bucketRegion: any = req.body?.bucketRegion
  const bucketAccessKeyId: any = req.body?.bucketAccessKeyId
  const bucketSecretAccessKey: any = req.body?.bucketSecretAccessKey
  const key: any = req.body?.key

  if (!bucketName) {
    res.send({
      error: 'Bucket name is required.',
    })
  } else if (!bucketRegion) {
    res.send({
      error: 'Bucket region is required.',
    })
  } else if (!bucketAccessKeyId) {
    res.send({
      error: 'Bucket access key ID is required.',
    })
  } else if (!bucketSecretAccessKey) {
    res.send({
      error: 'Bucket secret access key is required.',
    })
  } else if (!key) {
    res.send({
      error: 'Key is required.',
    })
  } else {
    try {
      const test = await s3DeleteFile({
        bucketName: bucketName,
        bucketRegion: bucketRegion,
        bucketAccessKeyId: bucketAccessKeyId,
        bucketSecretAccessKey: bucketSecretAccessKey,
        key: key,
      })

      res.send({
        statusCode: 200,
        key: key,
        message: `Successfully deleted the object.`,
      })
    } catch (error) {
      res.send({
        statusCode: 500,
        error: `${error}`,
      })
    }
  }
}
