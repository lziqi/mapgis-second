import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.midi.Soundbank;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;

public class getTrashClass extends HttpServlet
{
    private Process m_pro;
    @Override
    public void init(){
        System.out.println("getTrashClass init");
    }


    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    {
        try {
            PrintWriter printWriter = response.getWriter();

            String[] arg = new String[] {"python","code/main.py"};

            m_pro = Runtime.getRuntime().exec(arg);// 执行py文件
            //用输入输出流来截取结果
            BufferedReader in = new BufferedReader(new InputStreamReader(m_pro.getInputStream()));
            String line = null;
            while ((line = in.readLine()) != null) {
                printWriter.write(line+' ');
            }
            in.close();
            m_pro.waitFor();

            printWriter.close();
        }catch (Exception e)
        {
            e.printStackTrace();
            System.out.println("error in getTrashClass");
        }
    }

    @Override
    public void destroy(){
        super.destroy();
    }
}
