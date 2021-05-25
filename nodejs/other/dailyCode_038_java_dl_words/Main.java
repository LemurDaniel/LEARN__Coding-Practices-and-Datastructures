
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Console;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.jsoup.nodes.Element;

public class Main {
    
    public static void main(String[] args) throws Exception{
		
		Console cnsl = System.console();

		System.out.println("Enter Outputfile: ");
        String tmp = cnsl.readLine();
		String filename = tmp.length() == 0 ? "038_41.284_words.txt" : tmp;

        System.out.println("Enter Outputpath: ");
     	tmp = cnsl.readLine();
		String filepath = tmp.length() == 0 ? "C:\\Users\\Daniel Notebook\\Documents\\Git\\" : tmp;
		
		new File(filepath).mkdirs();
		File file = new File(filepath + filename); 
        file.createNewFile();

		int start = 1;
		int end = 1000;


		while(end <= 42000) {
			if(end == 42000) end = 41284;

			String url = String.format("https://en.m.wiktionary.org/wiki/Wiktionary:Frequency_lists/TV/2006/%d-%d", start, end);
			Document doc = Jsoup.connect(url).get();

			Elements words = doc.select("tbody tr");


			try (BufferedWriter bw = new BufferedWriter(new FileWriter(file.getAbsolutePath(), true))) {
			
				for (int i=1; i<words.size(); i++) {

					Element word = words.get(i);
			
					String str = word.childNode(2).childNode(0).attr("title").split(" ")[0];
					bw.write(str+"\r\n");
					bw.flush();
				}
				
			} catch (IOException ioe) {
				ioe.printStackTrace();
				return;
			}

			System.out.println(String.format("Downloaded %d words", end));
			start = end+1;
			if(end < 10000) end += 1000;
			else end += 2000;
		}

	}

}
