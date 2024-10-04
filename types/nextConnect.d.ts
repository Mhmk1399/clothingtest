// next-connect.d.ts
declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
    import { IncomingMessage, ServerResponse } from 'http';
  
    interface Middleware<Req = NextApiRequest, Res = NextApiResponse> {
      (req: Req, res: Res, next: (err?: any) => void): void;
    }
  
    interface Options<Req = NextApiRequest, Res = NextApiResponse> {
      onError?: (
        err: any,
        req: Req,
        res: Res,
        next: (err?: any) => void
      ) => void;
      onNoMatch?: (req: Req, res: Res) => void;
    }
  
    interface RequestHandler<Req = NextApiRequest, Res = NextApiResponse>
      extends NextApiHandler {
      use(middleware: Middleware<Req, Res>): this;
    }
  
    function nextConnect<Req = NextApiRequest, Res = NextApiResponse>(
      options?: Options<Req, Res>
    ): RequestHandler<Req, Res>;
  
    export default nextConnect;
  }
  