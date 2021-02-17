import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import clipboard from "clipboard";
hljs.registerLanguage("json", json);

window.generator = function generator() {
  return {
    serviceName: "service-name",
    accountNumber: "947631824670",
    stage: "dev",
    region: "us-east-1",
    initCopyButton() {
      const component = this;
      new clipboard("#copy-btn", {
        text: function (trigger) {
          return component.policyJSON;
        },
      });
    },
    get policyHTML() {
      return hljs.highlight("json", this.policyJSON).value;
    },
    get policyJSON() {
      const statements = [
        {
          Effect: "Allow",
          Action: [
            "cloudformation:Describe*",
            "cloudformation:List*",
            "cloudformation:Get*",
            "cloudformation:CreateStack",
            "cloudformation:UpdateStack",
            "cloudformation:DeleteStack",
          ],
          Resource: [
            `arn:aws:cloudformation:${this.region}:${this.accountNumber}:stack/${this.serviceName}-${this.stage}/*`,
          ],
        },
        {
          Effect: "Allow",
          Action: ["cloudformation:ValidateTemplate"],
          Resource: ["*"],
        },
        {
          Effect: "Allow",
          Action: [
            "s3:GetBucketLocation",
            "s3:CreateBucket",
            "s3:DeleteBucket",
            "s3:ListBucket",
            "s3:GetBucketPolicy",
            "s3:PutBucketPolicy",
            "s3:DeleteBucketPolicy",
            "s3:ListBucketVersions",
            "s3:PutAccelerateConfiguration",
            "s3:GetEncryptionConfiguration",
            "s3:PutEncryptionConfiguration",
            "s3:PutObject",
            "s3:GetObject",
            "s3:DeleteObject",
          ],
          Resource: [`arn:aws:s3:::${this.serviceName}*serverlessdeploy*`],
        },
        {
          Action: [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:DeleteLogGroup",
            "logs:DeleteLogStream",
            "logs:DescribeLogStreams",
            "logs:FilterLogEvents",
            "logs:DeleteRetentionPolicy",
            "logs:PutRetentionPolicy",
          ],
          Resource: `arn:aws:logs:${this.region}:${this.accountNumber}:log-group:/aws/lambda/${this.serviceName}*:log-stream:*`,
          Effect: "Allow",
        },
        {
          Effect: "Allow",
          Action: [
            "iam:GetRole",
            "iam:PassRole",
            "iam:CreateRole",
            "iam:DeleteRole",
            "iam:DetachRolePolicy",
            "iam:PutRolePolicy",
            "iam:AttachRolePolicy",
            "iam:DeleteRolePolicy",
          ],
          Resource: [
            `arn:aws:iam::${this.accountNumber}:role/${this.serviceName}-${this.stage}-${this.region}-lambdaRole`,
          ],
        },
        {
          Effect: "Allow",
          Action: [
            "apigateway:GET",
            "apigateway:POST",
            "apigateway:PUT",
            "apigateway:DELETE",
            "apigateway:PATCH",
          ],
          Resource: [
            "arn:aws:apigateway:*::/restapis*",
            "arn:aws:apigateway:*::/apikeys*",
            "arn:aws:apigateway:*::/usageplans*",
          ],
        },
        {
          Effect: "Allow",
          Action: [
            "lambda:GetFunction",
            "lambda:CreateFunction",
            "lambda:DeleteFunction",
            "lambda:UpdateFunctionConfiguration",
            "lambda:UpdateFunctionCode",
            "lambda:ListVersionsByFunction",
            "lambda:PublishVersion",
            "lambda:CreateAlias",
            "lambda:DeleteAlias",
            "lambda:UpdateAlias",
            "lambda:GetFunctionConfiguration",
            "lambda:AddPermission",
            "lambda:RemovePermission",
            "lambda:InvokeFunction",
          ],
          Resource: [
            `arn:aws:lambda:${this.region}:${this.accountNumber}:function:${this.serviceName}-${this.stage}-*`,
          ],
        },
        {
          Effect: "Allow",
          Action: [
            "events:Put*",
            "events:Remove*",
            "events:Delete*",
            "events:Describe*",
          ],
          Resource: [
            `arn:aws:events:${this.region}:${this.accountNumber}:rule/${this.serviceName}-${this.stage}-*`,
          ],
        },
        {
          Effect: "Allow",
          Action: ["cloudwatch:GetMetricStatistics"],
          Resource: ["*"],
        },
      ];

      return JSON.stringify(
        {
          Version: "2012-10-17",
          Statement: statements,
        },
        null,
        2
      );
    },
  };
};
