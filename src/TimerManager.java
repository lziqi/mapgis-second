import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

class Task extends TimerTask {
    public void run()
    {
        System.out.println("小小陈然");
        try
        {
            /*SAXReader saxReader = new SAXReader();
            Document document = saxReader.read(new File("data/trash.xml"));
            Element root = document.getRootElement();*/
            System.out.println("time task");

        }
        catch(Exception e) {
            e.printStackTrace();
            System.out.println("write trashData error");
        }
    }
}

public class TimerManager
{
    private static final long m_interval = 24 * 60 * 60 * 1000;
    public TimerManager()
    {
        System.out.println("start timer manager...........");
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 1); //凌晨1点
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        Date date=calendar.getTime(); //第一次执行定时任务的时间
        //如果第一次执行定时任务的时间 小于当前的时间
        //此时要在 第一次执行定时任务的时间加一天，以便此任务在下个时间点执行。如果不加一天，任务会立即执行。
        if (date.before(new Date())) {
            date = this.addDay(date, 1);
        }
        Timer timer = new Timer();
        Task task = new Task();
        //安排指定的任务在指定的时间开始进行重复的固定延迟执行。
        timer.schedule(task,date,m_interval);
    }

    // 增加或减少天数
    public Date addDay(Date date, int num)
    {
        Calendar startDT = Calendar.getInstance();
        startDT.setTime(date);
        startDT.add(Calendar.DAY_OF_MONTH, num);
        return startDT.getTime();
    }
}