using Basic_Calc.Code;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;


// Die Elementvorlage "Leere Seite" wird unter https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x407 dokumentiert.

namespace Basic_Calc
{
    /// <summary>
    /// Eine leere Seite, die eigenständig verwendet oder zu der innerhalb eines Rahmens navigiert werden kann.
    /// </summary>
    public sealed partial class MainPage : Page
    {

        //private ICalc calc = new Code.V1.Calc();
        private ICalc calc = new Code.V2.Calc();
        private int mode = 1;

        public MainPage() => this.InitializeComponent();

        private void Click(object sender, RoutedEventArgs e)
        {
            if (sender == BTNswap)
            {
                Box1.Visibility = Box1.Visibility == Visibility.Visible ? Visibility.Collapsed : Visibility.Visible;
                Box2.Visibility = Box2.Visibility == Visibility.Visible ? Visibility.Collapsed : Visibility.Visible;
            }
            else if (sender == BTNclear) (((Box1.Visibility == Visibility.Visible ? Box1 : Box2).Child as ScrollViewer).Content as TextBlock).Text = "";
            else if (sender == BTNprintStack) ((Box1.Child as ScrollViewer).Content as TextBlock).Text = calc.PrintStack();
            else if (sender == BTNmode)
            {
                mode = (mode + 1) % 3;
                calc.SetMode(mode);
                BTNmode.IsChecked = true;
                if (mode == 0) BTNmode.Content = "Polish Notation";
                else if (mode == 1) BTNmode.Content = "Infix";
                else if (mode == 2) BTNmode.Content = "Reverse Polish Notation";
            }
            else if (sender == BTNpush)
            {
                //try
                //{
                    calc.Eval(InputBox.Text);
                //}catch (Exception ex)
                //{
                //    Console.WriteLine(ex);
                //}
                InputBox.Text = "";
                Click(BTNprintStack, e);
            }
        }
    }
}
